import React from "react";

export function Left() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <path d="M20 30 L8 16 20 2" />
    </svg>
  )
}

export function Right() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <path d="M12 30 L24 16 12 2" />
    </svg>
  )
}

export function Ellipsis() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="19" cy="12" r="1"></circle>
      <circle cx="5" cy="12" r="1"></circle>
    </svg>
  )
}

export function Loading() {
  return (
    <div className="loading" id="loading">
      <div className="loading__icon">
      </div>
    </div>
  )
}

export function Moon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-moon">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  )
}

export function Sun() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-sun">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  )
}

export function Mail() {
  return (
    <svg className="icon__stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  )
}

export function Github() {
  return (
    <svg viewBox="0 0 64 64" className="icon__fill">
      <path stroke-width="0" d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z" />
    </svg>
  )
}

export function Message() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon__stroke" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
  )
}

export function Close() {
  return (

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  )
}

export function Setting() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
  );
}

export function Logo() {
  return (
    <svg t="1561525523287" class="logo_img" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1117" width="30.029296875" height="30"><defs><style type="text/css"></style></defs><path d="M1017.948269 9.123563c-4.863707-5.785251-12.031275-9.113051-19.557222-9.113051l-26.110427 0c-258.032454-0.102394-461.847374-0.153591-611.905533 35.735447-80.635142 19.301237-142.992985 48.432282-190.606116 89.031436-51.401703 43.82456-86.420393 101.216302-107.155144 175.554223-13.77197 49.353826-20.222782 138.487656 6.96278 227.160714 10.034595 32.766026 25.700852 63.688963 46.589193 92.103251-62.255449 97.530124-116.063407 225.983185-116.063407 378.805977 0 14.130349 11.468109 25.598458 25.598458 25.598458s25.598458-11.468109 25.598458-25.598458c0-235.761795 139.665185-410.650458 222.91137-493.845446 59.7468-59.7468 127.275532-110.175762 195.367429-145.808815 63.381781-33.175601 123.947732-51.4529 170.536925-51.4529 14.130349 0 25.598458-11.468109 25.598458-25.598458s-11.468109-25.598458-25.598458-25.598458c-55.497456 0-122.667809 19.813206-194.241097 57.340545-72.597226 38.039308-144.477695 91.591282-207.80828 154.973063-26.72479 26.72479-58.876453 62.357843-90.823328 105.977615-12.389654-19.506025-22.014674-40.189579-28.619076-61.794677-25.598458-83.553366-16.178225-164.034917-6.604402-198.388047 73.211589-262.384191 351.313233-263.049751 855.858835-262.896161-60.156376 321.926204-172.328817 530.29765-333.599101 619.533873-149.597387 82.785412-297.966048 37.629733-354.845821 14.335136-11.980078-4.914904-24.06255-10.95614-35.786644-17.91892-12.133669-7.218765-27.851122-3.225406-35.069887 8.908263s-3.225406 27.851122 8.908263 35.069887c13.925561 8.2939 28.260697 15.461468 42.595834 21.349114 31.844481 13.004017 83.143791 29.694211 146.679163 35.172281 14.027955 1.228726 27.902319 1.791892 41.674289 1.791892 75.208269 0 145.860012-18.072511 210.675307-53.910352 82.375837-45.565255 153.641943-119.749585 211.904033-220.351524 68.296685-118.00889 119.698388-274.51786 152.720399-465.175173 1.279923-7.423553-0.767954-15.051893-5.631661-20.837145z" p-id="1118" fill="currentcolor"></path></svg>
  );
}
