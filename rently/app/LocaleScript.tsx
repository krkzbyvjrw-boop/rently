/** Sets html lang from storage before paint. */
export default function LocaleScript() {
  const script = `(function(){try{var l=localStorage.getItem('renly_locale');if(l==='lt'||l==='ru'||l==='en')document.documentElement.lang=l}catch(e){}})();`

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
