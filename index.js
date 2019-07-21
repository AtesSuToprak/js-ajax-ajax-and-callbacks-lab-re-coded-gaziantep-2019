$(document).ready(function (){
});

function searchRepositories(){
  const searchTerms = document.getElementById('searchTerms').value;
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data){
      $('#results').html(displayRepositories(data));
    }).fail(function(error){
    displayError(error)
  });
}

 function displayError(error) {
  $('#errors').html("I'm sorry, there's been an error, please try again.");
}

 function displayRepositories(data) {
  return data.items.map(repo => renderRepositories(repo));
}

 function renderRepositories(repo) {
return `<li>
    Name: ${repo.name}<br>
    Description: ${repo.description}<br>
    URL: <a href="${repo.html_url}">${repo.html_url}</a><br>
    <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}"
    onclick="showCommits(this)">Show Commits</a><br></br>`;
  }

 function showCommits(el) {
  const owner= el.dataset.owner;
  const repo = el.dataset.repository;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`).done(function(data) {
     $('#details').html(renderCommits(data));
   }).fail(function(error) {
     displayError(error);
  });
}

 function renderCommit(commit) {
  return `<li>
    <h3>SHA: ${commit.sha}</h3>
    <p>Name: ${commit.author.name}</p><br>
    <p>Login: ${commit.author.login}</p>
    <p>Message: ${commit.message}</p></li>`;
}

 function renderCommits(data) {
  const repo = data.map(commit => renderCommit(commit)).join('');
  return `<ul>${repo}</ul>`;
}