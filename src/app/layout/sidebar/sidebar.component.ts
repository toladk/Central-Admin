import { HomeService } from './../../home/services/home.service';
import { Permission } from './../../home/permissions';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {Component, Inject, ElementRef, OnInit, Renderer2, HostListener, OnDestroy } from '@angular/core';
import { ROUTES } from './sidebar-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})

export class SidebarComponent implements OnInit {
  public sidebarItems: any[];
  level1Menu = '';
  level2Menu = '';
  level3Menu = '';
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  userFullName: string;
  userImg: string;
  userType: string;
  headerHeight = 60;
  currentRoute: string;
  routerObj = null;

  // For Permission
  usernameResult = [];
  permList = [];
  permissionList = [];
  count = 0;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private router: Router,
    private homeService: HomeService,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callLevel1Toggle(event: any, element: any) {
    if (element === this.level1Menu) {
      this.level1Menu = '0';
    } else {
      this.level1Menu = element;
    }
    const hasClass = event.target.classList.contains('toggled');
    if (hasClass) {
      this.renderer.removeClass(event.target, 'toggled');
    } else {
      this.renderer.addClass(event.target, 'toggled');
    }
  }
  callLevel2Toggle(event: any, element: any) {
    if (element === this.level2Menu) {
      this.level2Menu = '0';
    } else {
      this.level2Menu = element;
    }
  }
  callLevel3Toggle(event: any, element: any) {
    if (element === this.level3Menu) {
      this.level3Menu = '0';
    } else {
      this.level3Menu = element;
    }
  }
  ngOnInit() {
    this.getUserByUsername();

    this.sidebarItems = ROUTES.filter(sidebarItem => sidebarItem);
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }

  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }


  // To get User Details
  getUserByUsername(){
    let getUsername = localStorage.getItem('username');
    this.homeService.getUserByUsername(getUsername).subscribe((result: any) =>{
    this.usernameResult = result.roles;
    console.log("checking username", this.usernameResult)
    let centralAdminRole = this.usernameResult.find(x=>x.applicationName === "CENTRALADMINAPP");
    if(centralAdminRole === undefined){
      alert('You dont have access to use this Application');
      this.router.navigateByUrl('/authentication/login');
    }
    else{
      console.log('checking Application Name', centralAdminRole);
      centralAdminRole.permissions.forEach(permission => {
        this.permissionList.push(permission.name);
      });
      console.log("permissions",this.permissionList);
    }
    })
  }


  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
  }

  myFunction3() {
    document.getElementById("myDropdown3").classList.toggle("show");
  }

  myFunction4() {
    document.getElementById("myDropdown4").classList.toggle("show");
  }


}
