<curve-editor class="some-class">
  <p> { this.opts.store.getState().present.msg } </p>
  
  <script type="babel">
    const {store} = opts;
  
    store.subscribe(this.update.bind(this));
  </script>

</curve-editor>