export interface Municipality {
  name: string;
}

export interface Province {
  name: string;
  municipalities: string[];
}

export const angolaMunicipalities: Record<string, string[]> = {
  "Luanda": [
    "Luanda",
    "Belas",
    "Cacuaco",
    "Cazenga",
    "Icolo e Bengo",
    "Kilamba Kiaxi",
    "Quiçama",
    "Viana"
  ],
  "Bengo": [
    "Ambriz",
    "Bula Atumba",
    "Dande",
    "Dembos",
    "Nambuangongo",
    "Pango Aluquém"
  ],
  "Benguela": [
    "Benguela",
    "Baía Farta",
    "Balombo",
    "Bocoio",
    "Caimbambo",
    "Catumbela",
    "Chongoroi",
    "Cubal",
    "Ganda",
    "Lobito"
  ],
  "Bié": [
    "Andulo",
    "Camacupa",
    "Catabola",
    "Chinguar",
    "Chitembo",
    "Cuemba",
    "Cunhinga",
    "Cuíto",
    "Nharea"
  ],
  "Cabinda": [
    "Cabinda",
    "Belize",
    "Buco-Zau",
    "Cacongo"
  ],
  "Cuando Cubango": [
    "Calai",
    "Cuangar",
    "Cuchi",
    "Cuito Cuanavale",
    "Dirico",
    "Mavinga",
    "Menongue",
    "Nankova",
    "Rivungo"
  ],
  "Cuanza Norte": [
    "Ambaca",
    "Banga",
    "Bolongongo",
    "Cambambe",
    "Cazengo",
    "Golungo Alto",
    "Gonguembo",
    "Lucala",
    "Quiculungo",
    "Samba Caju"
  ],
  "Cuanza Sul": [
    "Amboim",
    "Cassongue",
    "Cela",
    "Conda",
    "Ebo",
    "Libolo",
    "Mussende",
    "Porto Amboim",
    "Quibala",
    "Quilenda",
    "Seles",
    "Sumbe",
    "Waku Kungo"
  ],
  "Cunene": [
    "Cahama",
    "Cuanhama",
    "Curoca",
    "Cuvelai",
    "Namacunde",
    "Ombadja"
  ],
  "Huambo": [
    "Bailundo",
    "Cachiungo",
    "Caála",
    "Ecunha",
    "Huambo",
    "Londuimbali",
    "Longonjo",
    "Mungo",
    "Chicala-Choloanga",
    "Chinjenje",
    "Ucuma"
  ],
  "Huíla": [
    "Caconda",
    "Cacula",
    "Caluquembe",
    "Chiange",
    "Chibia",
    "Chicomba",
    "Chipindo",
    "Cuvango",
    "Humpata",
    "Jamba",
    "Lubango",
    "Matala",
    "Quilengues",
    "Quipungo"
  ],
  "Lunda Norte": [
    "Cambulo",
    "Capenda-Camulemba",
    "Caungula",
    "Chitato",
    "Cuango",
    "Cuílo",
    "Lóvua",
    "Lubalo",
    "Lucapa",
    "Xá-Muteba"
  ],
  "Lunda Sul": [
    "Cacolo",
    "Dala",
    "Muconda",
    "Saurimo"
  ],
  "Malanje": [
    "Cacuso",
    "Calandula",
    "Cambundi-Catembo",
    "Cangandala",
    "Caombo",
    "Cunda-Dia-Baze",
    "Cuaba Nzogo",
    "Malanje",
    "Marimba",
    "Massango",
    "Mucari",
    "Quela",
    "Quirima",
    "Cangola"
  ],
  "Moxico": [
    "Alto Zambeze",
    "Bundas",
    "Camanongue",
    "Cameia",
    "Léua",
    "Luau",
    "Luacano",
    "Luchazes",
    "Moxico"
  ],
  "Namibe": [
    "Bibala",
    "Camucuio",
    "Moçâmedes",
    "Tômbwa",
    "Virei"
  ],
  "Uíge": [
    "Ambuíla",
    "Bembe",
    "Buengas",
    "Bungo",
    "Damba",
    "Milunga",
    "Mucaba",
    "Negage",
    "Puri",
    "Quimbele",
    "Quitexe",
    "Sanza Pombo",
    "Songo",
    "Uíge",
    "Zombo"
  ],
  "Zaire": [
    "Cuimba",
    "M'banza Congo",
    "Nóqui",
    "Nzeto",
    "Soyo",
    "Tomboco"
  ]
};

export const angolaProvinces = Object.keys(angolaMunicipalities).sort();

export function getMunicipalitiesByProvince(province: string): string[] {
  return angolaMunicipalities[province] || [];
}
