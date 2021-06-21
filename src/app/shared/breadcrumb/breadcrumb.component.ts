import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from 'rxjs/operators';
import {IBreadcrumb} from "./breadcrumb.interface";


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  /**
   * list of breadcrumbs
   */
  breadcrumbs!: IBreadcrumb[];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.router, this.breadcrumbs);
        console.log(this.breadcrumbs);
      });
  }

  /**
   * Create breadcrumbs
   * @param route Route
   * @param breadcrumbs List of breadcrumbs
   */
  private createBreadcrumbs(route: any, breadcrumbs: IBreadcrumb[] = []): any {
    route.config.forEach((data: any) => {
      if (data.data) {
        let root = route.routerState.snapshot.root.children[0]
        if (!breadcrumbs.some(e => e.label === data.data.breadcrumb)) {
          breadcrumbs.push({label: data.data.breadcrumb, url: data.path, show: !data.path.includes('/')});
        }
        let count = 0;
        breadcrumbs.map(e => {
          count++;
          if (count > 1 && root.data.breadcrumb == 'Competitions') {
            e.show = false;
          }
          if (e.label === root.data.breadcrumb) {
            let rep = e.url.split('/').pop() || '';
            e.url =
              e.url.includes(':id') ?
                e.url.replace(/:id/gi, root.data.params) :
                `${e.url.slice(0, -rep.length)}${root.data.params}`;
            e.show = true;
          }
        });
      }
    });
    return breadcrumbs;
  }
}
