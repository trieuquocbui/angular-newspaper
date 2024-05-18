import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { NewspaperModel } from 'src/app/models/newspaper';
import { OriginModel } from 'src/app/models/origin';
import { TopicModel } from 'src/app/models/topic';
import { NewspaperService } from 'src/app/services/newspaper.service';
import { OriginService } from 'src/app/services/origin.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-edit-newspaper',
  templateUrl: './edit-newspaper.component.html',
  styleUrls: ['./edit-newspaper.component.css','../admin.component.css','../add-edit-style.component.css']
})
export class EditNewspaperComponent implements OnInit {
  public imageList:string[] = [];
  public imageFileList:File[] = [];
  public submited:Boolean = false;
  public messageSucces:string = "";
  public submitedHandleParagraph:Boolean = false;
  public selectedImage!:File;
  public pathImageFile:string = AppEnum.PATH_IMAGE_FIME + AppEnum.DEFAULT_NO_IMAGE;
  public messageErrorName:string = "";
  public allTopic!:TopicModel[];
  public allOrigin!:OriginModel[];
  public newspaper!:NewspaperModel;
  public newspaperId!:string; 

  constructor(private route:ActivatedRoute,private topicService:TopicService,private originService:OriginService,private formBuilder:FormBuilder,private newspaperService:NewspaperService) { }

  newspaperForm = this.formBuilder.group({
    name:[null,[Validators.required]],
    topic:[null,[Validators.required]],
    origin:[null,[Validators.required]],
    datetime:[null],
    paragraphs: this.formBuilder.array([],[Validators.required]),
  })

  handleParagrapForm = this.formBuilder.group({
    index:[null,[Validators.required]],
    handleId:[null,[Validators.required]],
  })

  ngOnInit() {
    this.newspaperId = this.route.snapshot.params['newspaperId'];
    forkJoin({
      topics: this.topicService.getAllTopic(),
      origins: this.originService.getAllOrigin()
  }).subscribe({
      next: ({ topics, origins }) => {
          if(topics.code == CodeEnum.SUCCESS){
            this.allTopic = topics.data;
          }

          if(origins.code == CodeEnum.SUCCESS){
            this.allOrigin = origins.data;
          }
          this.findById(this.newspaperId);
      },
      error: error => {
          
      }
  });


  }

  get f(): { [key: string]: AbstractControl } {
    return this.newspaperForm.controls;
  }

  get paragraphs():FormArray{
    return this.f['paragraphs'] as FormArray;
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

  deleteImageFile(index:number){
    if(this.imageList[index] && this.imageFileList[index]){
      this.imageList.splice(index,1);
      this.imageFileList.splice(index,1);
    }
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
          const controlToAddThumbnail = this.formBuilder.control(AppEnum.DEFAULT_NO_IMAGE, Validators.required);
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

  controlsExistInParagraph(index: number, controlName: string): boolean {
    const paragraph = this.paragraphs.at(index) as FormGroup;
    return !!paragraph.get(controlName);
  }

  findById(newspaperId:string){
    this.newspaperService.getNewspaper(newspaperId).subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.newspaper = value.data;
        this.f['name'].setValue(this.newspaper.name);
        const topic = this.allTopic.find(topic => topic.name === this.newspaper.topic)?.name;
        const origin = this.allOrigin.find(origin => origin.name === this.newspaper.origin)?.name;
        this.f['topic'].setValue(topic);
        this.f['origin'].setValue(origin);
        this.f['datetime'].setValue(this.newspaper.datetime);
        this.newspaper.paragraphs.forEach((paragraph,index) =>{
          const existParagraph:FormGroup = this.formBuilder.group({
            content:[paragraph.content,Validators.required]
          })
          if(paragraph.thumbnail != null){
            this.imageList[index] = AppEnum.PATH_IMAGE_FIME + paragraph.thumbnail;
            const controlToAddThumbnail = this.formBuilder.control(paragraph.thumbnail, Validators.required);
            const controlToAddfigCaption = this.formBuilder.control(paragraph.figCaption, Validators.required);  
            existParagraph.addControl('thumbnail',controlToAddThumbnail);
            existParagraph.addControl('figCaption',controlToAddfigCaption);
          }
          this.paragraphs.push(existParagraph);
        })
        }
      },
      error:err=>{

      }
    })
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
        datetime: this.f['datetime'].value,
        paragraphs: this.paragraphs.value,
      }
      const formData = new FormData();
      if(this.imageFileList.length > 0){
        this.imageFileList.forEach((file) => { formData.append('files', file); });
      }
      formData.append(
        'data',
        new Blob([JSON.stringify(newspaper)], { type: 'application/json' })
      );
      
      
      this.newspaperService.updateNewspaper(this.newspaperId,formData).subscribe({
        next:value=>{
          if(value.code == CodeEnum.SUCCESS){
            this.messageSucces = value.message;
          }
          
        },
        error:err=>{
          const code = err.error.code;
           if(code == CodeEnum.ERROR_NAME_EXIST){
            this.messageErrorName = err.error.message;
          }
        }
      })
    }
  }

}
