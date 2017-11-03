
const populationFields = [{key: 'väkiluku',name: 'Väkiluku',unit: ''},{key: 'väkiluvun_muutos_edellisestä_vuodesta',name: 'Väkiluvun muutos edellisestä vuodesta',unit: '%'},{key: 'alle_15vuotiaiden_osuus_väestöstä',name: 'Alle 15-vuotiaiden osuus',unit: '%'},{key: 'n1564_vuotiaiden_osuus_väestöstä',name: '15-64 -vuotiaiden osuus',unit: '%'},{key: 'yli_64vuotiaiden_osuus_väestöstä',name: 'Yli 64-vuotiaiden osuus',unit: '%'},{key: 'eläkeläisten_osuus_väestöstä',name: 'Eläkeläisten osuus',unit: '%'},{key: 'ruotsinkielisten_osuus_väestöstä',name: 'Ruotsinkielisten osuus',unit: '%'},{key: 'ulkomaan_kansalaisten_osuus_väestöstä',name: 'Ulkomaankansalaisten osuus',unit: '%'},];
const educationFields = [{key: 'vähintään_keskiasteen_tutkinnon_suorittaneiden_osuus',name: 'Keskiasteen tutkinnon suorittaneiden osuus',unit: '%'},{key: 'korkeaasteen_tutkinnon_suorittaneiden_osuus',name: 'Korkea-asteen tutkinnon suorittaneiden osuus',unit: '%'}];
const employmentFields = [{key: 'työllisyysaste',name: 'Työllisyysaste',unit: '%'},{key: 'työttömien_osuus_työvoimasta',name: 'Työttömien osuus työvoimasta',unit: '%'},{key: 'asuinkunnassaan_työssäkäyvien_osuus',name: 'Asuinkunnassaan työssäkäyvien osuus',unit: '%'},{key: 'kunnassa_olevien_työpaikkojen_lukumäärä',name: 'Työpaikkojen lukumäärä',unit: ''},{key: 'alkutuotannon_työpaikkojen_osuus',name: 'Alkutuotannon työpaikkojen osuus',unit: '%'},{key: 'jalostuksen_työpaikkojen_osuus',name: 'Jalostuksen työpaikkojen osuus',unit: '%'},{key: 'palvelujen_työpaikkojen_osuus',name: 'Palvelujen työpaikkojen osuus',unit: '%'},{key: 'alueella_asuvan_työllisen_työvoiman_määrä',name: 'Alueella asuvan työllisen työvoiman määrä',unit: ''},{key: 'taloudellinen_huoltosuhde',name: 'Taloudellinen huoltosuhde',unit: ''}];

export function getFields(category) {
  switch (category) {
    case 'Väestö':
      return populationFields;
    case 'Työllisyys':
      return employmentFields;
    case 'Koulutus':
      return educationFields;
    default:
      return [];
  }
}
