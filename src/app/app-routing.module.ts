import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
/*
0.路由模块初始化
1.配置路由表
  请求xxx路径的时候，导航到xxx组件
2.配置路由出口及路由导航链接
*/
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {LayoutComponent} from './layout/layout.component';
import {ContactListComponent} from './contact-list/contact-list.component';
import {ContactNewComponent} from './contact-new/contact-new.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';
import {TagListComponent} from './tag-list/tag-list.component';
import {TagNewComponent} from './tag-new/tag-new.component';
import {TagEditComponent} from './tag-edit/tag-edit.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'/contacts',//当请求根路径的时候，跳转到contacts联系人组件
    pathMatch:'full'//必须完全匹配到路径才会重定向
  },
  {
    path:'layout',
    component:LayoutComponent
  },
  //当访问contacts时候，会先把LayoutComponent组件渲染出来
  //然后把children中path为空的路由渲染到LayoutComponent组件中的路由出口
  {
    path:'contacts',
    component:LayoutComponent,
    canActivate:[AuthGuard],//在导航contacts之前会先进入路由守卫
    children:[
      {
        path:'',
        component:ContactListComponent
      },
      {
        path:'new',//这里的new的请求路径是/contacts/new
        component:ContactNewComponent
      },
      {
        path:'edit/:id',
        component:ContactEditComponent
      },
    ]
  },
  {
    path:'tags',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'',
        component:TagListComponent
      },
      {
        path:'new',
        component:TagNewComponent
      },
      {
        path:'edit/:id',//动态路径'
        component:TagEditComponent
      },
    ]
  },
  {
    path:'signin',
    component:SigninComponent
  },
  {
    path:'signup',
    component:SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
