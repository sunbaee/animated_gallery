const track = document.querySelector("#image-track");
const image = document.querySelectorAll(".image");

window.onmousedown = e => {
      track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e => {
      if(track.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2,
            percentage = (mouseDelta / maxDelta) * -100,
            nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

      let n = nextPercentage;

      if(nextPercentage <= -100) n = -100;
      if(nextPercentage >= 0) n = 0;

      track.dataset.percentage = n;

      track.animate({
            transform: `translateX(${n}%)`
      }, {
            duration: 3000,
            fill: "forwards"
      });

      image.forEach(img => {
            img.animate({
                  objectPosition: `${100 + n}% 50% `
            }, {
                  duration: 3000,
                  fill: "forwards"
            });
      })
      
}

window.onmouseup = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;
}
