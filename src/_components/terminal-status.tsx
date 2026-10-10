export default ({ children }: { children?: Lume.Data['children'] }) => (
  <div class='terminal-status-bar' aria-label='Terminal status' data-pagefind-ignore>
    <span class='terminal-status-item'>NORMAL</span>
    {children && <span class='terminal-status-item'>{children}</span>}
    <span class='terminal-status-item terminal-status-right'>EOF</span>
  </div>
);
