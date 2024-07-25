export const mountainNames = ["북한산", "설악산"];

interface Mountain {
  name: string;
  lat: number;
  lon: number;
}

interface MountainInformation {
  [key: string]: Mountain;
}


export const mountainInformation: MountainInformation = {
  "bukhan": {
    name: "북한산",
    lat: 37.645175709619025,
    lon: 126.97477909129488
  },
  "seorak": {
    name: "설악산",
    lat: 38.17151087237107,
    lon: 128.43856899800753
  }
};
