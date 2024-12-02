(() => {

  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const spinningIndicator = document.querySelector("#spinning-indicator");

  function showSpinningIndicator() {
    spinningIndicator.style.display = 'block';
  }

  function hideSpinningIndicator() {
    spinningIndicator.style.display = 'none';
  }

  function loadInfoBoxes() {
    showSpinningIndicator();
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        infoBoxes.forEach((infoBox, counter) => {
          let selected = document.querySelector(`#hotspot-${counter + 1}`);

          const titleElement = document.createElement('h2');  
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;

          const earbudImage = document.createElement('img');
          earbudImage.src = `images/earbud${counter + 1}.jpg`;
          earbudImage.alt = infoBox.heading;

          selected.appendChild(earbudImage); 
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
      })
      .catch(error => {
        console.error('Error Found in Loading Info Boxes.', error);
      })
      .finally(() => {
        hideSpinningIndicator();
      });
  }

  loadInfoBoxes();

  function loadMaterialInfo() {
    showSpinningIndicator();

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materialListData => {
        materialListData.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
      })
      .catch(error => {
        console.error('Error Found in Material Info.', error);
      })
      .finally(() => {
        hideSpinningIndicator();
      });
  }

  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();
