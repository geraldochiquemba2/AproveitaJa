export const ANGOLA_PROVINCES = {
  "Luanda": ["Belas", "Cacuaco", "Cazenga", "Icolo e Bengo", "Luanda", "Quiçama", "Viana"],
  "Bengo": ["Ambriz", "Bula Atumba", "Dande", "Dembos", "Nambuangongo", "Pango Aluquém"],
  "Benguela": ["Balombo", "Baía Farta", "Benguela", "Bocoio", "Caimbambo", "Catumbela", "Chongorói", "Cubal", "Ganda", "Lobito"],
  "Bié": ["Andulo", "Camacupa", "Catabola", "Chinguar", "Chitembo", "Cuemba", "Cunhinga", "Kuito", "Nharea"],
  "Cabinda": ["Belize", "Buco-Zau", "Cabinda", "Cacongo"],
  "Cuando Cubango": ["Calai", "Cuangar", "Cuchi", "Cuito Cuanavale", "Dirico", "Mavinga", "Menongue", "Nankova", "Rivungo"],
  "Cuanza Norte": ["Ambaca", "Banga", "Bolongongo", "Cambambe", "Cazengo", "Golungo Alto", "Gonguembo", "Lucala", "Quiculungo", "Samba Cajú"],
  "Cuanza Sul": ["Amboim", "Cassongue", "Cela", "Conda", "Ebo", "Libolo", "Mussende", "Porto Amboim", "Quibala", "Quilenda", "Seles", "Sumbe"],
  "Cunene": ["Cahama", "Cuanhama", "Curoca", "Cuvelai", "Namacunde", "Ombadja"],
  "Huambo": ["Bailundo", "Catchiungo", "Caála", "Ecunha", "Huambo", "Londuimbale", "Longonjo", "Mungo", "Tchicala-Tcholoanga", "Tchindjenje", "Ukuma"],
  "Huíla": ["Caconda", "Cacula", "Caluquembe", "Chiange", "Chibia", "Chicomba", "Chipindo", "Cuvango", "Humpata", "Jamba", "Lubango", "Matala", "Quilengues", "Quipungo"],
  "Lunda Norte": ["Cambulo", "Capenda-Camulemba", "Caungula", "Chitato", "Cuango", "Cuílo", "Lubalo", "Lucapa", "Xá-Muteba"],
  "Lunda Sul": ["Cacolo", "Dala", "Muconda", "Saurimo"],
  "Malanje": ["Cacuso", "Calandula", "Cambundi-Catembo", "Cangandala", "Caombo", "Cuaba Nzogo", "Cunda-Dia-Baze", "Quirima", "Malanje", "Marimba", "Massango", "Mucari", "Quela", "Quirima"],
  "Moxico": ["Alto Zambeze", "Bundas", "Camanongue", "Cameia", "Léua", "Luacano", "Luau", "Luchazes", "Luena", "Moxico"],
  "Namibe": ["Bibala", "Camucuio", "Moçâmedes", "Tômbwa", "Virei"],
  "Uíge": ["Alto Cauale", "Ambuíla", "Bembe", "Buengas", "Bungo", "Damba", "Maquela do Zombo", "Milunga", "Mucaba", "Negage", "Puri", "Quitexe", "Sanza Pombo", "Songo", "Uíge", "Zombo"],
  "Zaire": ["Cuimba", "Mbanza Kongo", "Nóqui", "Nzeto", "Soyo", "Tomboco"]
} as const;

export type ProvinceName = keyof typeof ANGOLA_PROVINCES;
export type MunicipalityName = typeof ANGOLA_PROVINCES[ProvinceName][number];

export const getProvinces = (): ProvinceName[] => {
  return Object.keys(ANGOLA_PROVINCES) as ProvinceName[];
};

export const getMunicipalities = (province: ProvinceName): readonly string[] => {
  return ANGOLA_PROVINCES[province] || [];
};
