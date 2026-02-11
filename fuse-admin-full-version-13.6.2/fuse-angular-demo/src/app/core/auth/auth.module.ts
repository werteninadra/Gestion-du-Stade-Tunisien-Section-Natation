import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthInterceptor } from 'app/core/auth/auth.interceptor';
import { RoleService } from 'app/core/user/role.service';
import { UserService } from 'app/core/user/user.service';

@NgModule({
    imports  : [
        HttpClientModule
    ],
    providers: [
        AuthService,
        UserService,
        RoleService,
        {
            provide : HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi   : true
        }
    ]
})
export class AuthModule
{
}
