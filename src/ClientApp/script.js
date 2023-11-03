                document.addEventListener("DOMContentLoaded", function() {
                const lightsaber = document.getElementById("lightsaber");
                let angle = 0;
                const maxAngle = 90; // Maximum rotation angle

                function rotateLightsaber() {
                    angle = (angle + 1) % (maxAngle + 1);
                    lightsaber.style.transform = `rotate(${angle}deg)`;
                    requestAnimationFrame(rotateLightsaber);
                }

                rotateLightsaber();
                });