import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = {
    email:'',
    password:''
  }
  email_err_msg = ''
  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  signup(){
    //1.表单验证
    //2.获取表单数据
    //3.发起http请求和服务端交互
    //4.根据相应结果做交互处理
    const formData = this.signupForm;
    //console.log(formData)
    this.http.post('http://localhost:3000/users',formData).toPromise().then((data: any) =>{
      //console.log(data)
      this.email_err_msg = '';
      //window.alert('用户注册成功');
      window.localStorage.setItem('auth_token',data.token);
      this.router.navigate(['/']);
    }).catch(err => {
      console.log(err)
      if(err.status === 409){
        //window.alert('邮箱已被占用');
        this.email_err_msg = '邮箱已被占用';
      }
    })
  }
}
