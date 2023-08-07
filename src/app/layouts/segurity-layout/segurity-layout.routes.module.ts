import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NotFoundPageComponent } from '../../pages/not-found-page/not-found-page.component';
import { RoleFrmComponent } from './role-frm/role-frm.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: '/user',
    component: UserComponent,
    // title: 'Usuarios',
  },
  {
    path: 'users',
    component: UserComponent,
    // title: 'Usuarios',
  },
  {
    path: 'role',
    component: RoleComponent,
    // title: 'Roles',
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    // title: 'Perfil',
  },
  {
    path: 'create-role',
    component: RoleFrmComponent,
    // title: 'Crear Rol',
  },
  {
    path: 'edit-role/:id',
    component: RoleFrmComponent,
    // title: 'Editar Rol',
  },
  {
    path: 'menu',
    component: MenuComponent,
    // title: 'Menús del sistema',
  },
  {
    path: '**',
    component: NotFoundPageComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegurityChildRoutingModule {}
