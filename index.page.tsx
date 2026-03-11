

export default (data:Lume.Data, helpers:Lume.Helpers) => <div class="prose">
  data:{data.search.pages('url^=/posts/').map(page => <a key={page.url} href={page.url}>1{page.title}</a>)}
</div>
