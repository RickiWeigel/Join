function renderContactDetailsTemplateHead(id, contact){
    return `
    <div class="back-arrow-contacts d-none" onmouseover="hoverBackArrow('back-arrow-contacts')" onmouseleave="leaveBackArrow('back-arrow-contacts')" onclick="closeContactsDetails()">
        <img id="back-arrow-contacts" src="./assets/img/functionButtons/arrowDefault.png" alt="">
    </div>


    <div class="contact-detail-top">
        <div class="profil-pic-big" style="background-color: ${contact.color};">
            <span>${contact.initials}</span>
        </div>
        <div class="profil-detail-name" id="profil-detail-name">
            <span>${contact.name}</span>
            <div class="contact-detail-edit-delete">
                <div class="contact-detail-edit" onclick="slideInPopupEdit(${id})">
                    <img class="normal-image" src="../../assets/img/functionButtons/icon_edit_contact.png">
                    <img class="hover-image" style="display: none;"
                        src="../../assets/img/functionButtons/icon_edit_contact_hover.png">
                    <span>Edit</span>
                </div>
                <div class="contact-detail-delete" onclick="contactDelete(${id})">
                    <img class="normal-image" src="../../assets/img/functionButtons/icon_delete_contact.png">
                    <img class="hover-image" style="display: none;"
                        src="../../assets/img/functionButtons/icon_delete_contact_hover.png">
                    <span>Delete</span>
                </div>
            </div>
        </div>
    </div>
    `
}

function renderContactDetailsTemplateInfos(contact){
return `
<div class="contact-detail-text">
    <span>Contact Information</span>
</div>
<div class="contact-info-detail">
    <div class="profil-detail-email" id="profil-detail-email">
        <span class="contact-profil-subheadline">Email</span>
        <span class="contact-profil-email">${contact.email}</span>
    </div>
    <div class="profil-detail-phone" id="profil-detail-phone">
        <span class="contact-profil-subheadline">Phone</span>
        <span class="contact-profil-phone">${contact.phone}</span>
    </div>
</div>
`
}