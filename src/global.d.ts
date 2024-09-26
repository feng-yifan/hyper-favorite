/// <reference types='chrome'/>

declare namespace chrome {
  declare namespace tabs {
    interface Tab {
      status?: 'unloaded' | 'loading' | 'complete';
    }
  }
}

declare module '*.png'
declare module '*.svg'
