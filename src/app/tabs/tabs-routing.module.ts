import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {path: '', 
  children: [  {
    path: 'feed',
    loadChildren: () => import('../feed/feed.module').then( m => m.FeedPageModule)},
  {
    path: 'uploader',
    loadChildren: () => import('../uploader/uploader.module').then( m => m.UploaderPageModule)},
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)},
  {
    path: ':fileId',
    loadChildren: () => import('../single/single.module').then( m => m.SinglePageModule)
  },
  {
    path: 'edit/:fileId',
    loadChildren: () => import('../single-edit/single-edit.module').then( m => m.SingleEditPageModule)
  },
  
  
  ],
  component: TabsPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
