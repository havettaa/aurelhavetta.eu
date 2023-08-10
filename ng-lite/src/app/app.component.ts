import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center" class="content">
      <h1>
        window.title is updating every second
      </h1>
    </div>
    <h2>but NG reacts every 4 seconds</h2>
    <ul>
      <li>
        <h3>Because rerender is not called from external JS</h3>
        <div>window.title = <mark>{{ windowobj.document.title }}</mark></div>
      </li>
    </ul>
    
  `
})
export class AppComponent implements OnInit, OnDestroy {
  
  windowobj = window;

  title = 'ng-lite';

  intervalobj: any;

  ngOnInit() {
    this.intervalobj = setInterval(() => {
      this.callMethod(); 
    }, 4000);
  }

  ngOnDestroy() {
    if (this.intervalobj) {
      clearInterval(this.intervalobj);
    }
  }

  callMethod(){
    console.log('Call Function Every Five Seconds.', new Date());
  }
}
