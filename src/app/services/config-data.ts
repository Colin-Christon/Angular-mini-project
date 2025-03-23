export const CONFIG_ORDER = [
    {label:'Name', show:true, required:true,pattern: '^\\s*[sa-zA-Z]+$'},
    {label:'Mobile', show:true, required:true, pattern: '^([1-9]{2}\\s)[0-9]{10}$' },
    {label:'Email', show:true, required:false, pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'},
    {label:'Address', show:true, required:false, pattern: '.+'},
    {label:'name2', show:'showName2', required:false,pattern: '[a-z]{3}'},
  ]
  