/** Runs before paint so dark mode does not flash white on load. */
export default function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem('renly_theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}})();`

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
