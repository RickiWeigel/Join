function renderContactDetailsTemplateHead(id, contact) {
  return `
    <div class="back-arrow-contacts d-none" onmouseover="hoverBackArrow('back-arrow-contacts')" onmouseleave="leaveBackArrow('back-arrow-contacts')" onclick="closeContactsDetails()">
        <img id="back-arrow-contacts" src="./assets/img/functionButtons/arrowDefault.png" alt="">
    </div>


    <div class="contact-detail-top">
        <div class="profil-pic-big" style="background-color: ${contact.color};">
            <span>${contact.initials}</span>
        </div>
        <div class="profil-detail-name" id="profil-detail-name">
            <span>${breakLine(contact)}</span>
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
    `;
}

function renderContactDetailsTemplateInfos(contact) {
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
`;
}

function renderContactsEditTemplate(id, contact) {
  return `
    <div class="slide-container-top slide-edit-radius">
    <img src="../../assets/img/logo/IconHeader.png" alt="">
    <span class="slide-container-top-headline">Edit contact</span>
    <div class="add-conctact-close" onclick="slideOutPopupEdit()">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none">
        <path
          d="M9.00007 10.8642L2.46673 17.389C2.22229 17.6331 1.91118 17.7552 1.5334 17.7552C1.15562 17.7552 0.84451 17.6331 0.600065 17.389C0.355621 17.1449 0.233398 16.8342 0.233398 16.4569C0.233398 16.0796 0.355621 15.7689 0.600065 15.5248L7.1334 9.00002L0.600065 2.47527C0.355621 2.23115 0.233398 1.92045 0.233398 1.54316C0.233398 1.16588 0.355621 0.855181 0.600065 0.611058C0.84451 0.366935 1.15562 0.244873 1.5334 0.244873C1.91118 0.244873 2.22229 0.366935 2.46673 0.611058L9.00007 7.13581L15.5334 0.611058C15.7778 0.366935 16.089 0.244873 16.4667 0.244873C16.8445 0.244873 17.1556 0.366935 17.4001 0.611058C17.6445 0.855181 17.7667 1.16588 17.7667 1.54316C17.7667 1.92045 17.6445 2.23115 17.4001 2.47527L10.8667 9.00002L17.4001 15.5248C17.6445 15.7689 17.7667 16.0796 17.7667 16.4569C17.7667 16.8342 17.6445 17.1449 17.4001 17.389C17.1556 17.6331 16.8445 17.7552 16.4667 17.7552C16.089 17.7552 15.7778 17.6331 15.5334 17.389L9.00007 10.8642Z"
          fill="white" />
      </svg>
    </div>
  </div>
  
  <div class="slide-container-content-container">
    <div class="contact-profil-pic" style="background-color: ${contact.color};">
      <span>${contact.initials}</span>
    </div>
    <form onsubmit="addEditContact(${contact.id}); return false;" id="edit-inputs" class="slide-container-content-container-form">
      <div class="input-container">
        <input type="text" id="edit-content-input-name" placeholder="Name" value="${contact.name}" autocomplete="off" required>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
          <mask id="mask0_24479_2831" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
            height="25">
            <rect y="0.48291" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_24479_2831)">
            <path
              d="M12 12.4829C10.9 12.4829 9.95833 12.0912 9.175 11.3079C8.39167 10.5246 8 9.58291 8 8.48291C8 7.38291 8.39167 6.44124 9.175 5.65791C9.95833 4.87458 10.9 4.48291 12 4.48291C13.1 4.48291 14.0417 4.87458 14.825 5.65791C15.6083 6.44124 16 7.38291 16 8.48291C16 9.58291 15.6083 10.5246 14.825 11.3079C14.0417 12.0912 13.1 12.4829 12 12.4829ZM18 20.4829H6C5.45 20.4829 4.97917 20.2871 4.5875 19.8954C4.19583 19.5037 4 19.0329 4 18.4829V17.6829C4 17.1162 4.14583 16.5954 4.4375 16.1204C4.72917 15.6454 5.11667 15.2829 5.6 15.0329C6.63333 14.5162 7.68333 14.1287 8.75 13.8704C9.81667 13.6121 10.9 13.4829 12 13.4829C13.1 13.4829 14.1833 13.6121 15.25 13.8704C16.3167 14.1287 17.3667 14.5162 18.4 15.0329C18.8833 15.2829 19.2708 15.6454 19.5625 16.1204C19.8542 16.5954 20 17.1162 20 17.6829V18.4829C20 19.0329 19.8042 19.5037 19.4125 19.8954C19.0208 20.2871 18.55 20.4829 18 20.4829ZM6 18.4829H18V17.6829C18 17.4996 17.9542 17.3329 17.8625 17.1829C17.7708 17.0329 17.65 16.9162 17.5 16.8329C16.6 16.3829 15.6917 16.0454 14.775 15.8204C13.8583 15.5954 12.9333 15.4829 12 15.4829C11.0667 15.4829 10.1417 15.5954 9.225 15.8204C8.30833 16.0454 7.4 16.3829 6.5 16.8329C6.35 16.9162 6.22917 17.0329 6.1375 17.1829C6.04583 17.3329 6 17.4996 6 17.6829V18.4829ZM12 10.4829C12.55 10.4829 13.0208 10.2871 13.4125 9.89541C13.8042 9.50374 14 9.03291 14 8.48291C14 7.93291 13.8042 7.46208 13.4125 7.07041C13.0208 6.67874 12.55 6.48291 12 6.48291C11.45 6.48291 10.9792 6.67874 10.5875 7.07041C10.1958 7.46208 10 7.93291 10 8.48291C10 9.03291 10.1958 9.50374 10.5875 9.89541C10.9792 10.2871 11.45 10.4829 12 10.4829Z"
              fill="#A8A8A8" />
          </g>
        </svg>
      </div>
      <div class="input-container">
        <input type="email" id="edit-content-input-email" placeholder="Email" value="${contact.email}" autocomplete="off" required>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
          <mask id="mask0_24479_2838" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
            height="25">
            <rect y="0.48291" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_24479_2838)">
            <path
              d="M4 20.4829C3.45 20.4829 2.97917 20.2871 2.5875 19.8954C2.19583 19.5037 2 19.0329 2 18.4829V6.48291C2 5.93291 2.19583 5.46208 2.5875 5.07041C2.97917 4.67874 3.45 4.48291 4 4.48291H20C20.55 4.48291 21.0208 4.67874 21.4125 5.07041C21.8042 5.46208 22 5.93291 22 6.48291V18.4829C22 19.0329 21.8042 19.5037 21.4125 19.8954C21.0208 20.2871 20.55 20.4829 20 20.4829H4ZM20 8.48291L12.525 13.1579C12.4417 13.2079 12.3542 13.2454 12.2625 13.2704C12.1708 13.2954 12.0833 13.3079 12 13.3079C11.9167 13.3079 11.8292 13.2954 11.7375 13.2704C11.6458 13.2454 11.5583 13.2079 11.475 13.1579L4 8.48291V18.4829H20V8.48291ZM12 11.4829L20 6.48291H4L12 11.4829ZM4 8.73291V7.25791V7.28291V7.27041V8.73291Z"
              fill="#A8A8A8" />
          </g>
        </svg>
      </div>
      <div class="input-container">
        <input type="tel" pattern="[0-9]*" id="edit-content-input-phone" placeholder="Phone" value="${contact.phone}" autocomplete="off" required>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
          <mask id="mask0_24479_2845" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
            height="25">
            <rect y="0.98291" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_24479_2845)">
            <path
              d="M19.95 21.9829C17.8667 21.9829 15.8083 21.5287 13.775 20.6204C11.7417 19.7121 9.89167 18.4246 8.225 16.7579C6.55833 15.0912 5.27083 13.2412 4.3625 11.2079C3.45417 9.17458 3 7.11624 3 5.03291C3 4.73291 3.1 4.48291 3.3 4.28291C3.5 4.08291 3.75 3.98291 4.05 3.98291H8.1C8.33333 3.98291 8.54167 4.06208 8.725 4.22041C8.90833 4.37874 9.01667 4.56624 9.05 4.78291L9.7 8.28291C9.73333 8.54958 9.725 8.77458 9.675 8.95791C9.625 9.14124 9.53333 9.29958 9.4 9.43291L6.975 11.8829C7.30833 12.4996 7.70417 13.0954 8.1625 13.6704C8.62083 14.2454 9.125 14.7996 9.675 15.3329C10.1917 15.8496 10.7333 16.3287 11.3 16.7704C11.8667 17.2121 12.4667 17.6162 13.1 17.9829L15.45 15.6329C15.6 15.4829 15.7958 15.3704 16.0375 15.2954C16.2792 15.2204 16.5167 15.1996 16.75 15.2329L20.2 15.9329C20.4333 15.9996 20.625 16.1204 20.775 16.2954C20.925 16.4704 21 16.6662 21 16.8829V20.9329C21 21.2329 20.9 21.4829 20.7 21.6829C20.5 21.8829 20.25 21.9829 19.95 21.9829ZM6.025 9.98291L7.675 8.33291L7.25 5.98291H5.025C5.10833 6.66624 5.225 7.34124 5.375 8.00791C5.525 8.67458 5.74167 9.33291 6.025 9.98291ZM14.975 18.9329C15.625 19.2162 16.2875 19.4412 16.9625 19.6079C17.6375 19.7746 18.3167 19.8829 19 19.9329V17.7329L16.65 17.2579L14.975 18.9329Z"
              fill="#A8A8A8" />
          </g>
        </svg>
      </div>
    </form>
  
    <div class="slide-container-content-buttons">
      <button class="buttonWhiteDelete create-contact-button" onclick="contactDelete(${id})">
        <span>Delete</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path
            d="M12.501 12.983L17.744 18.226M7.258 18.226L12.501 12.983L7.258 18.226ZM17.744 7.73999L12.5 12.983L17.744 7.73999ZM12.5 12.983L7.258 7.73999L12.5 12.983Z"
            stroke="#647188" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          </path>
        </svg>
      </button>
      <button type="submit" form="edit-inputs" class="buttonBlue create-contact-button">
        <span style="width: 162px;">save</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
          <mask id="mask0_24479_1578" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25"
            height="25">
            <rect x="0.5" y="0.98291" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_24479_1578)">
            <path
              d="M10.05 16.1329L18.525 7.65791C18.725 7.45791 18.9625 7.35791 19.2375 7.35791C19.5125 7.35791 19.75 7.45791 19.95 7.65791C20.15 7.85791 20.25 8.09541 20.25 8.37041C20.25 8.64541 20.15 8.88291 19.95 9.08291L10.75 18.2829C10.55 18.4829 10.3167 18.5829 10.05 18.5829C9.78336 18.5829 9.55002 18.4829 9.35002 18.2829L5.05002 13.9829C4.85002 13.7829 4.75419 13.5454 4.76252 13.2704C4.77086 12.9954 4.87502 12.7579 5.07502 12.5579C5.27502 12.3579 5.51252 12.2579 5.78752 12.2579C6.06252 12.2579 6.30002 12.3579 6.50002 12.5579L10.05 16.1329Z"
              fill="white" />
          </g>
        </svg>
      </button>
    </div>
  </div>
    
    `;
}
