import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  formData:any = {
    name:'',
    email:'',
    phone:'',
    id:0
  }
  
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    //如何在组件中获取路由参数
    const contactId = this.route.snapshot.params.id;
    //console.log(contactId);
    this.getContactById(contactId)
  }
  getContactById(id){
    this.http.get(`http://localhost:3000/contacts/${id}`)
    .toPromise()
    .then(data => {
      console.log(data)
      this.formData = data;
    })
    .catch(err =>{
      console.log(err)
    })
  }
  editContact(){
    const id = this.formData.id;
    this.http.patch(`http://localhost:3000/contacts/${id}`,this.formData)
    .toPromise()
    .then(data => {
      //console.log(data)
      this.router.navigate(['/contacts'])
    })
    .catch(err => {
      console.log(err)
    })
  }
}
