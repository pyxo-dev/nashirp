export default {
  blog: {
    post: [{ id: 'fc1582e2-853e-48c8-9da2-990557b37583', xDefault: 'ar' }],

    postLc: [
      {
        id: '50c64e48-bf12-483f-b6e5-944a0fc9983c',
        postId: 'fc1582e2-853e-48c8-9da2-990557b37583',
        langTag: 'ar',
        slug: 'ميّزات كِنت',
        title: 'ميّزات كِنت',

        body: `
<p>من ميزات كِنت:</p>
<ul class="org-ul">
  <li>دعم &rsquo;SSR&rsquo;.</li>
  <li>يدعم كِنت أنماطا متعددة للروابط.</li>
  <li>دعم استخدام ملف تعريف ارتباط للغة.</li>
  <li>إمكانية استعمال تفضيلات متصفح المستخدم الخاصة باللغة.</li>
  <li>دعم علامات <code>hreflang</code>.</li>
  <li>تحميل حزم لغات كوازار وملفات الترجمة الخاصة ب=vue-i18n= حسب الطلب.</li>
  <li>
    وسوم اللغات، كِنت يستخدم مصطلح &ldquo;وسم لغة&rdquo; للدلالة على لغة أم أو
    على لغة محلية مشتقة من تلك اللغة، وينصح كِنت باستخدام وسوم لغة
    <a href="https://www.w3.org/International/articles/language-tags">BCP 47</a
    >.
  </li>
</ul>
`,

        summary: `
<p>من ميزات كِنت:</p>
<ul class="org-ul">
  <li>دعم &rsquo;SSR&rsquo;.</li>
  <li>يدعم كِنت أنماطا متعددة للروابط.</li>
</ul>
`,
      },
      {
        id: '7627b286-8d8a-41d2-ac08-79e352d7f40a',
        postId: 'fc1582e2-853e-48c8-9da2-990557b37583',
        langTag: 'en',
        slug: 'qint-features',
        title: 'Qint Features',

        body: `
<p>Some of Qint features include:</p>
<ul class="org-ul">
  <li>SSR support.</li>
  <li>
    Supports different URL modes: prefix (example.com/en), subdomain
    (en.example.com), host (example.co.uk), search-param (example.com?l=en),
    none (example.com)
  </li>
  <li>Supports the use of a language tag cookie.</li>
  <li>
    Can make use of the user&rsquo;s client language preferences (e.g. browser
    settings).
  </li>
  <li>Support for <code>hreflang</code> link tags.</li>
  <li>
    Lazy loading of Quasar language packs and <code>vue-i18n</code> locale
    messages.
  </li>
  <li>
    Language tags, Qint uses the term &ldquo;language tag&rdquo; to denote a
    language or a locale, and recommends the use of
    <a href="https://www.w3.org/International/articles/language-tags">BCP 47</a>
    language tags.
  </li>
</ul>
`,

        summary: `
<p>Some of Qint features include:</p>
<ul class="org-ul">
  <li>SSR support.</li>
  <li>
    Supports different URL modes: prefix (example.com/en), subdomain
    (en.example.com), host (example.co.uk), search-param (example.com?l=en),
    none (example.com)
  </li>
</ul>
`,
      },
    ],
  },
}
