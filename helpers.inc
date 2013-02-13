<% if @mode == 'edit' %>
<!-- This adds a link to the live url within Blocks edit mode: -->
	<div id="page_url_helper">Page url: <a target="_blank" href="<%= @page.url %>"><%= @page.url %></a></div> 
<% end  %>