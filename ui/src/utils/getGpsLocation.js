export default async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject(
        new Error("La geolocalización no está disponible en este navegador.")
      );
    }
  });
}
