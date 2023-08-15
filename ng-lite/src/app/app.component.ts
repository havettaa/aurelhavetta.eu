import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ref, reactive, watchEffect, computed } from "vue";

window.refstate = ref({tile1: 'vue ref', tile2: 'ref2',  price: 0});
window.reactive = reactive({num: 0});

declare global {
  interface Window { refstate: any, reactive: any, titulka: any; }
}

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center" class="content">
      <h1>
        window.title is updating every second
      </h1>
    </div>
    <h2>but {{title}} reacts every 4 seconds</h2>
    <ul>
      <li>
        <h3>Because rerender is not called from external JS</h3>
        <div>window.title = <mark>{{ windowobj.document.title }}</mark></div>
        <div>window.titulka = <mark>{{ windowobj.titulka }}</mark></div>
        <div>titulka = <mark>{{ titulka }}</mark></div>
        <div>refstate.tile1 = <mark>{{ refstate.value.tile1 }}</mark></div>
        <div>reactive = <mark>{{ reactive.num }}</mark></div>
      </li>
    </ul>
    <button (click)="btnClick">update vue ref</button>
  `,
  providers: []
})
export class AppComponent implements OnInit, OnDestroy {
  
  constructor(private changeDetectorRef:ChangeDetectorRef) {
  }

  windowobj = window;

  public get titulka() {
    return window.titulka
  }

  public set titulka(value) {
    window.titulka = value;
  }

  title = 'ng-lite';

  intervalobj: any;

  reactive = reactive({num: 1});
  refstate = ref({tile1: 'vue ref', tile2: 'ref2',  price: 0});
  refcomputed = computed(() => {
    console.error(`refcomputed called ${window?.titulka}`);
    return this.refstate.value.tile1 + window?.titulka;
  });

  watchEffect() {
    this.changeDetectorRef.detectChanges();
    //this.applicationRef.tick();
    // this.ngZone.run(() => {
    //   this.title = Math.random().toString();
    // });
  }

  ngOnInit() {
    watchEffect(() => this.watchEffect());
    
    window.refstate = this.refstate;
    window.reactive = this.reactive;

    this.intervalobj = setInterval(async() => {
      await this.callMethod(); 
    }, 4000);
  }

  btnClick() {
    this.refstate.value.tile1 = Math.random().toString();
    this.reactive.num = Math.random();
  }

  async callMethod(){
    console.log('Call Function Every Five Seconds.', new Date());
    //this.titulka = window?.titulka;
  }

  ngOnDestroy() {
    if (this.intervalobj) {
      clearInterval(this.intervalobj);
    }
  }

}
