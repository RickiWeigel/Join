function categoryHTMLTemplate(category, i){
return `
<div onclick="setSelectedCategory('${i}')" class="dropdown-content" 
  onmouseover="categoryHover(${i})" onmouseleave="categoryLeave(${i})">
  <div class="dropdown-content-left">
    <span>${category.name}</span>
    <div class="colorCircle" style="background: ${category.color};"></div>
  </div>
  <img class="delete-btn d-none" id="categoryDeleteBtn-${i}" 
    onclick="deleteCategory(${i}, event)" src="../../assets/img/functionButtons/delete.png">
</div>
`
}