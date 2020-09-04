import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';
years=['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020']
  users;
  year:any='';launch:any='';land:any='';

  constructor(private _data:DataService){}


  getallData(){
    let url='/v3/launches?limit=100'
    this._data.getData(url).subscribe(
      res=>{
        console.log(res)
        this.users=res;
      },
      err=>{
        console.log(err)
      }
    )
  }

  resetFilter(){
    this.year='';this.land='';this.launch=''
    this.getallData()
  }

selectYear(year){

 this.year=year;
 this.formUrl()
}

selectLand(land){
this.land=land;
this.formUrl()
}

selectLaunch(launch){
this.launch=launch;
this.formUrl()
}

formUrl(){
  let url='/v3/launches?limit=100'
  if(this.year!='' || this.land!='' || this.launch!=''){
    if(this.year!=''){
      url=url+'&amp;launch_year='+this.year
    }
    if(this.land!=''){
    url=url+'&amp;land_success='+(this.land=='istrue' ? true : false )
    }
    if(this.launch!=''){
      url=url+'&amp;launch_success='+(this.launch == 'istrue' ? true : false)
    }
  }
  else{
   url='/v3/launches?limit=100'
  }
this._data.getData(url).subscribe(
  res=>{
    console.log(res);
    this.users=res;
    this.users=this.filterData(this.users)
  },
  err=>{
    console.log(err)
  }
)
}

filterData(data){
 let filterdata=[];
 
 data.forEach((element)=>{
    if((!this.year? true : this.year==element.launch_year) && ((this.launch == 'istrue' ? true : false )== element.launch_success)){
      filterdata.push(element);
    }
 })
 return filterdata;
}


  ngOnInit(){
this.getallData()
  }
}

