// Main interactive behaviors for the portfolio
// - Responsive nav toggle
// - Generate placeholder project cards dynamically
// - Copy email to clipboard behavior
// - Set current year in footer

document.addEventListener('DOMContentLoaded', function(){
  // Nav toggle for small screens
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle && navToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    if(mainNav){
      mainNav.style.display = expanded ? 'none' : 'block';
    }
  });

  // Projects are currently static in the HTML. Replace them with dynamic generation
  // later if you prefer to keep data in a JSON file.

  // Copy email button
  const copyBtn = document.getElementById('copyEmail');
  const emailText = document.getElementById('emailText');
  copyBtn && copyBtn.addEventListener('click', async function(){
    const text = emailText ? emailText.textContent.trim() : '';
    try{
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = 'Copied!';
      setTimeout(()=> copyBtn.textContent = 'Copy', 1600);
    }catch(e){
      // Fallback: select and prompt
      const inp = document.createElement('input');
      document.body.appendChild(inp);
      inp.value = text;
      inp.select();
      try{ document.execCommand('copy'); copyBtn.textContent = 'Copied!'; }
      catch(e){ alert('Copy failed — please copy manually: ' + text); }
      inp.remove();
      setTimeout(()=> copyBtn.textContent = 'Copy', 1600);
    }
  });

  // Current year in footer
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Small utility: smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
      // If on small screen and nav is open, close it after click
      if(window.innerWidth <= 820){
        const nav = document.getElementById('mainNav');
        const toggle = document.getElementById('navToggle');
        if(nav && toggle){ nav.style.display = 'none'; toggle.setAttribute('aria-expanded','false'); }
      }
    });
  });

});

// Simple HTML escaping to avoid injection in placeholders
function escapeHtml(s){
  return String(s).replace(/[&<>"'`]/g, function(ch){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;","`":"&#96;"})[ch];
  });
}
