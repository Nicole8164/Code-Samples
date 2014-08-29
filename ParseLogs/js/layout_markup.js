/*
 Creating the templates used in index.html to generate tables based off search results. 
 These are formated to work with markup.js
*/

var search_results_header = '{{titles}}<th>{{.|topcase}}</th>{{/titles}}';

var search_results_login = '{{content}}<tr><td>{{noun}}</td><td>{{payload_user_id}}</td><td>{{payload_logins}}</td><td>{{time}}</td><td>{{verb}}</td><td>{{date}}</td></tr>{{/content}}';

var search_results_watch = '{{content}}<tr><td>{{noun}}</td><td>{{payload_user_id}}</td><td>{{payload_title}}</td><td>{{payload_episode}}</td><td>{{payload_type}}</td><td>{{time}}</td><td>{{verb}}</td><td>{{date}}</td></tr>{{/content}}';

var search_results_signup = '{{content}}<tr><td>{{noun}}</td><td>{{payload_user_id}}</td><td>{{payload_email}}</td><td>{{payload_name}}</td><td>{{time}}</td><td>{{verb}}</td><td>{{date}}</td></tr>{{/content}}';

