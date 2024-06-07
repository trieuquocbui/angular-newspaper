import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { NewspaperModel } from 'src/app/models/newspaper';
import { OriginModel } from 'src/app/models/origin';
import { TopicModel } from 'src/app/models/topic';
import { NewspaperService } from 'src/app/services/newspaper.service';
import { OriginService } from 'src/app/services/origin.service';
import { TopicService } from 'src/app/services/topic.service';
import { IDeactivateComponent } from '../../common/IDeactivate/IDeactivate.component';

@Component({
  selector: 'app-add-newspaper',
  templateUrl: './add-newspaper.component.html',
  styleUrls: ['./add-newspaper.component.css','../admin.component.css','../add-edit-style.component.css']
})
export class AddNewspaperComponent implements OnInit, IDeactivateComponent {
  public imageList:string[] = [];
  public imageFileList:File[] = [];
  public submited:Boolean = false;
  public submitedHandleParagraph:Boolean = false;
  public messageSucces:string = "";
  public messageErrorId:string = ""; 
  public messageErrorName:string = "";
  checkChangeImage: boolean = false;
  selectedImage!:File;
  pathImageFile:string = AppEnum.PATH_IMAGE_FIME + AppEnum.DEFAULT_NO_IMAGE;

  allTopic!:TopicModel[];
  allOrigin!:OriginModel[];
  
  constructor(private formBuilder:FormBuilder,private topicService:TopicService,private originService:OriginService,private newspaperService:NewspaperService) { }

  newspaperForm = this.formBuilder.group({
    name:[null,[Validators.required]],
    topic:[null,[Validators.required]],
    origin:[null,[Validators.required]],
    date:[null,[Validators.required]],
    time:[null,[Validators.required]],
    paragraphs: this.formBuilder.array([],[Validators.required]),
  })

  handleParagrapForm = this.formBuilder.group({
    index:[null,[Validators.required]],
    handleId:[null,[Validators.required]],
  })

  ngOnInit() {
    this.topicService.getAllTopic().subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.allTopic = value.data;
        }
      }
    })
    this.originService.getAllOrigin().subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.allOrigin = value.data;
        }
      }
    })

    this.createParagraph();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newspaperForm.controls;
  }

  get paragraphs():FormArray{
    return this.f['paragraphs'] as FormArray;
  }

  canExit() : boolean {
    if(this.newspaperForm.valid){
      if (confirm("Bạn có thêm lưu dữ liệu nhưng chưa lưu, bạn chắc là có muốn thoát không!")) {
        return true;
      } else {
        return false;
      }
    } else{
      return true;
    }
  }

  cancleError(){
    if(this.submited){
      this.submited = false;
    }
    if(this.submitedHandleParagraph){
      this.submitedHandleParagraph = false;
    }
  }

  createParagraph():void{
    const paragraph = this.formBuilder.group({
      content:[null,Validators.required]
    })
    this.paragraphs.push(paragraph);
  }

  deleteParagraph(index:number):void{
    this.paragraphs.removeAt(index);
  }

  onSubmitHandleParagrapForm(){
    this.submitedHandleParagraph = true;
    if(this.handleParagrapForm.valid){
      const index = this.handleParagrapForm.controls['index'].value! - 1; 
      const handle = this.handleParagrapForm.controls['handleId'].value;
      if(index > this.paragraphs.length){

      } else if( index < 0){

      } else{
        const paragraph =  this.paragraphs.at(index) as FormGroup;
        if( handle === "addImage"){
          const controlToAddThumbnail = this.formBuilder.control(null,Validators.required);
          const controlToAddfigCaption = this.formBuilder.control(null, Validators.required);  
          paragraph.addControl('thumbnail',controlToAddThumbnail);
          paragraph.addControl('figCaption',controlToAddfigCaption);
        } else if(handle === "removeParagraph"){
          this.deleteParagraph(index);
          this.deleteImageFile(index);
        } else if(handle === "removeImage"){
          paragraph.removeControl('thumbnail');
          paragraph.removeControl('figCaption');
          this.deleteImageFile(index);
        }
      }
    }
  }

  onImageChange(index:number,event: any): void {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      this.paragraphs.at(index).get('thumbnail')?.setValue(this.selectedImage.name);
      this.imageList[index] = URL.createObjectURL(this.selectedImage);
      this.imageFileList[index] = this.selectedImage;
    }
  }

  deleteImageFile(index:number){
    if(this.imageList[index] && this.imageFileList[index]){
      this.imageList.splice(index,1);
      this.imageFileList.splice(index,1);
    }
  }

  controlsExistInParagraph(index: number, controlName: string): boolean {
    const paragraph = this.paragraphs.at(index) as FormGroup;
    return !!paragraph.get(controlName);
  }

  combineDateTime(date: string, time: string): Date {
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    
    return new Date(year, month - 1, day, hours, minutes);
}

  onSubmit(){
    if(this.messageSucces != ""){
      this.messageSucces = "";
    }
    if(this.messageErrorName != ""){
      this.messageErrorName = "";
    }
    this.submited = true;
    if(this.newspaperForm.valid){
      let newspaper:NewspaperModel;
      newspaper = {
        name: this.f['name'].value,
        topic: this.f['topic'].value,
        origin: this.f['origin'].value,
        paragraphs: this.paragraphs.value,
        datetime: this.combineDateTime(this.f['date'].value,this.f['time'].value)
      }

      const formData = new FormData();
      if(this.imageFileList.length > 0){
        this.imageFileList.forEach((file) => { formData.append('files', file); });
      }
      formData.append(
        'data',
        new Blob([JSON.stringify(newspaper)], { type: 'application/json' })
      );

      this.newspaperService.addNewspaper(formData).subscribe({
        next:value=>{
          if(value.code == CodeEnum.SUCCESS){
            this.messageSucces = value.message;
            this.submited = false;
            this.newspaperForm.reset();
          }
        },
        error:err=>{
          const code = err.error.code;
          console.log(err.error);
           if(code == CodeEnum.ERROR_NAME_EXIST){
            this.messageErrorName = err.error.message;
          }
        }
      })
    }
  }
}
