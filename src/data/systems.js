import { X } from './constants.js';

export const systems = [
  { id: 'meis',       num: 1,  lines: ['MEİS'],                                       color: 'meis',    x: X.meis,        y: 52,
    label: 'MEİS — Mərkəzləşdirilmiş Elektron İnformasiya Sistemi',
    desc: 'Bütün sistemlər üçün vahid istifadəçi idarəetməsi, autentifikasiya, giriş nəzarəti, audit mexanizmləri və köməkçi funksionallıqları özündə ehtiva edən mərkəzi platform.' },

  { id: 'api',        num: 2,  lines: ['İnteqrasiya', 'Platforması (API/ESB)'],        color: 'tech',    x: X.tech,        y: 133,
    label: 'İnteqrasiya Platforması (API/ESB)',
    desc: 'Daxili və xarici sistemlər arasında standartlaşdırılmış, təhlükəsiz məlumat mübadiləsini təmin edən inteqrasiya infrastrukturu.' },

  { id: 'bi',         num: 3,  lines: ['Mərkəzi Analitika', '(BI Paneli)'],           color: 'tech',    x: X.tech,        y: 189,
    label: 'Mərkəzi Analitika və İdarəetmə Paneli (BI)',
    desc: 'KPI-lar, analitik hesabatlar, layihə dashboardları — real vaxt rejimində rəhbərlik üçün vizuallaşdırma platforması.' },

  { id: 'dw',         num: 4,  lines: ['Məlumat Anbarı', '(Data Warehouse)'],         color: 'tech',    x: X.tech,        y: 245,
    label: 'Məlumat Anbarı (Data Warehouse)',
    desc: 'Müxtəlif mənbələrdən məlumatların inteqrasiyası, tarixçə üzrə saxlanması, analitik emal üçün strukturlaşdırılmış mərkəzi məlumat platforması.' },

  { id: 'notify',     num: 5,  lines: ['Bildiriş', 'Kommunikasiya Xidməti'],          color: 'tech',    x: X.tech,        y: 301,
    label: 'Bildiriş və Kommunikasiya Xidməti',
    desc: 'SMS, e-mail və digər kanallar vasitəsilə avtomatlaşdırılmış bildirişlər: hadisələr, xəbərdarlıqlar, proses yeniləmələri.' },

  { id: 'storage',    num: 6,  lines: ['Fayl və Sənəd', 'Saxlama Xidməti'],           color: 'tech',    x: X.tech,        y: 357,
    label: 'Mərkəzləşdirilmiş Fayl və Sənəd Saxlama Xidməti',
    desc: 'Bütün sistemlər üzrə sənədlər, fayllar, media: saxlanma, versiyalaşdırma, API idarəetmə.' },

  { id: 'mobile',     num: 7,  lines: ['Mobil Sahə', 'Əməliyyatları Platforması'],    color: 'tech',    x: X.tech,        y: 413,
    label: 'Mobil Sahə Əməliyyatları Platforması',
    desc: 'Sahə əməkdaşlarının mobil cihazla məlumat toplaması, tapşırıq icrası, real vaxt sinxronizasiyası.' },

  { id: 'esened',     num: 8,  lines: ['eSənəd'],                                      color: 'corp',    x: X.corp,        y: 60,
    label: 'eSənəd — Elektron Sənəd Dövriyyəsi Sistemi',
    desc: 'Rəsmi sənədlərin yaradılması, razılaşdırılması, elektron imzalanması, dövriyyəsi və arxivləşdirilməsi.' },

  { id: 'halga',      num: 9,  lines: ['halga', '(CRM / Müraciət / Çağrı)'],         color: 'corp',    x: X.corp,        y: 116,
    label: 'halga — Vətəndaş Müraciətləri, CRM və Çağrı Mərkəzi',
    desc: 'Vətəndaş müraciətlərinin qəbulu, qeydiyyatı, çağrı mərkəzi funksionallığı ilə genişləndirilmiş CRM sistemi.' },

  { id: 'task',       num: 10, lines: ['Tapşırıqların', 'İdarəetmə (TİS)'],           color: 'corp',    x: X.corp,        y: 172,
    label: 'Tapşırıqların İdarəetmə Sistemi (TİS)',
    desc: 'Tapşırıqların planlaşdırılması, məsul şəxslərə yönləndirilməsi, icra statuslarının izlənməsi.' },

  { id: 'hr',         num: 11, lines: ['İnsan Resursları', 'Sistemi'],                 color: 'corp',    x: X.corp,        y: 228,
    label: 'İnsan Resursları Sistemi',
    desc: 'Kadr məlumatları, əmək münasibətləri, işçi heyəti planlaşdırılması və performans izlənməsi.' },

  { id: 'arxiv',      num: 12, lines: ['Elektron Arxiv', 'Sənəd İdarəetmə'],          color: 'corp',    x: X.corp,        y: 284,
    label: 'Elektron Arxiv və Sənəd İntellektual İdarəetmə Sistemi',
    desc: 'Sənədlərin rəqəmsallaşdırılması, OCR tanıması, avtomatik kateqoriyalaşdırma, semantik axtarış.' },

  { id: 'vasite',     num: 13, lines: ['Əsas Vəsaitlər', 'və Anbar Sistemi'],        color: 'corp',    x: X.corp,        y: 340,
    label: 'Əsas Vəsaitlərin və Anbarın İdarəetmə Sistemi',
    desc: 'Avadanlıqlar, materiallar, ehtiyat hissələri: qeydiyyat, anbar yerləşdirməsi, qalıqların real vaxt izlənməsi.' },

  { id: 'budce',      num: 14, lines: ['Büdcə', 'İnvestisiya Planlaşdırma'],          color: 'corp',    x: X.corp,        y: 396,
    label: 'Büdcə və İnvestisiya Planlaşdırma Sistemi',
    desc: 'İnvestisiya əsaslandırması, layihə prioritetləşdirilməsi, büdcə bölgüsü, maliyyə planlaşdırması.' },

  { id: 'audit',      num: 15, lines: ['Audit', 'Uyğunluq Nəzarəti'],                 color: 'corp',    x: X.corp,        y: 452,
    label: 'Audit və Uyğunluq Nəzarəti Sistemi',
    desc: 'Daxili nəzarət, audit yoxlamaları, normativ tələblərə uyğunluq qiymətləndirməsi, pozuntuların izlənməsi.' },

  { id: 'reyestr',    num: 16, lines: ['Yol Reyestri', 'Aktivlərin İdarəedilməsi'],   color: 'reg',     x: X.reg,         y: 256,
    label: 'Yol Reyestri və Aktivlərin İdarəedilməsi Sistemi',
    desc: 'Yollar, seqmentlər, infrastruktur aktivlər üzrə GİS, hüquqi, texniki məlumatların vahid model əsasında mərkəzi qeydiyyatı.' },

  { id: 'toll',       num: 17, lines: ['Ödənişli Yollar', 'Əməliyyat Platforması'],   color: 'ops',     x: X.ops,         y: 60,
    label: 'Ödənişli Yollar üzrə Mərkəzi Əməliyyat Platforması',
    desc: 'Tariflər, keçid əməliyyatları, ANPR/LPR kameralar, RFID/ETC, şlaqbaum, pozuntu aşkarlanması, borc uçotu.' },

  { id: 'neqliyyat',  num: 18, lines: ['Nəqliyyat', 'Mexanizmlər Sistemi'],           color: 'ops',     x: X.ops - 105,   y: 116,
    label: 'Nəqliyyat və Mexanizmlərin İdarəetmə Sistemi',
    desc: 'Avtonəqliyyat, xüsusi texnika: GPS izlənmə, yanacaq sərfiyyatı, texniki vəziyyət, istifadə intensivliyi.' },

  { id: 'tikinti',    num: 19, lines: ['Layihə Tikinti', 'Müqavilə Sistemi'],         color: 'ops',     x: X.ops + 105,   y: 116,
    label: 'Yol Layihə, Tikinti və Müqavilə İdarəetmə Sistemi',
    desc: 'Layihə planlaşdırması, tikinti idarəetməsi, müəllif/texniki nəzarət, podratçı seçimi, müqavilə icrası.' },

  { id: 'monitorinq', num: 20, lines: ['Yol Monitorinq', 'və Diaqnostika'],           color: 'ops',     x: X.ops - 105,   y: 172,
    label: 'Yol Monitorinq və Diaqnostika Platforması',
    desc: 'Sensorlar, IoT, tərəzilər, video müşahidə: real vaxt toplama, hadisə aşkarlama, texniki vəziyyət monitorinqi.' },

  { id: 'istisman',   num: 21, lines: ['İstismar Təmir', 'Sahə Əməliyyatları'],       color: 'ops',     x: X.ops + 105,   y: 172,
    label: 'Yol İstismar, Təmir və Sahə Əməliyyatları Sistemi',
    desc: 'Nasazlıq qeydiyyatı, prioritetləşdirmə, sahə briqadalarına yönləndirmə, icra nəticələrinin izlənməsi.' },

  { id: 'tehlu',      num: 22, lines: ['Yol Təhlükəsizliyi', 'Trafik Analitika'],     color: 'ops',     x: X.ops - 105,   y: 228,
    label: 'Yol Təhlükəsizliyi və Trafik Analitika Sistemi',
    desc: 'Qəza məlumatları, trafik göstəriciləri, risklərin analizi, təhlükəli sahələrin müəyyənləşdirilməsi.' },

  { id: 'icaze',      num: 23, lines: ['Ağır Nəqliyyat', 'İcazə Sistemi'],            color: 'ops',     x: X.ops + 105,   y: 228,
    label: 'Ağır və İriqabaritli Nəqliyyat İcazə Sistemi',
    desc: 'Normadan artıq çəkili nəqliyyat: marşrut uyğunluğu, yol aktivlərinə təsir analizi, icazə prosesi.' },

  { id: 'komm',       num: 24, lines: ['Kommunikasiya', 'Keçidləri İcazə'],           color: 'ops',     x: X.ops - 105,   y: 284,
    label: 'Kommunikasiya Keçidləri və İcazə İdarəetmə Sistemi',
    desc: 'Yollar üzərindəki mühəndis kommunikasiya xətlərinin planlaşdırılması, razılaşdırılması, icazə verilməsi.' },

  { id: 'yolknar',    num: 25, lines: ['Yolkənarı Xidmət', 'İnfrastrukturu'],        color: 'ops',     x: X.ops + 105,   y: 284,
    label: 'Yolkənarı Xidmət İnfrastrukturu İdarəetmə Sistemi',
    desc: 'Dayanacaqlar, istirahət zonaları, xidmət sahələri: status, istifadə, inkişaf planları, birləşmə texniki şərtlər.' },

  { id: 'torpaq',     num: 26, lines: ['Yol Torpaq Sahəsi', 'Hüquqi Nəzarət'],       color: 'ops',     x: X.ops - 105,   y: 340,
    label: 'Yol Torpaq Sahəsi və Hüquqi Nəzarət Modulu',
    desc: 'Yol torpaq sahələri GİS uçotu, qanunsuz tikililərin foto+geolokasiya ilə aşkarlanması, hüquqi tədbirlərin başlanması.' },

  { id: 'ekologiya',  num: 27, lines: ['Yaşıllıq', 'Ekoloji İdarəetmə'],             color: 'ops',     x: X.ops + 105,   y: 340,
    label: 'Yaşıllıq və Ekoloji İdarəetmə Modulu',
    desc: 'Yaşıllıq zolaqları, qoruyucu meşə sahələri: məkan uçotu, yaşıllaşdırma planlaşdırma, bərpa-qulluq izlənməsi.' },

  { id: 'mygov',      num: 28, lines: ['myGOV', 'Vətəndaş Müraciətləri'],            color: 'citizen', x: X.citizen,     y: 60,
    label: 'myGOV Vətəndaş Müraciətləri eXidməti',
    desc: 'myGOV platforması üzərindən vətəndaş müraciətlərinin qəbulu, İnteqrasiya Platforması vasitəsilə CRM sisteminə ötürülməsi.' },

  { id: 'odenis',     num: 29, lines: ['Ödənişli Yollar', 'Onlayn Ödəniş'],          color: 'citizen', x: X.citizen,     y: 116,
    label: 'Ödənişli Yollar üzrə Onlayn Ödəniş Xidməti',
    desc: 'Birbank, m10, ABB mobile, AzParking vasitəsilə keçid haqqı hesablanması, elektron ödəniş.' },

  { id: 'xerite',     num: 30, lines: ['İnteraktiv', 'Yol Xəritəsi'],                color: 'citizen', x: X.citizen,     y: 172,
    label: 'İctimai İnteraktiv Yol Xəritəsi',
    desc: 'Yol şəbəkəsi, kateqoriyalar, aktivlər, məhdudiyyət məlumatları: vətəndaşlar üçün interaktiv xəritə.' },

  { id: 'mehdudat',   num: 31, lines: ['Yol Məhdudiyyətləri', 'Məlumat Lövhəsi'],    color: 'citizen', x: X.citizen,     y: 228,
    label: 'Yol Məhdudiyyətləri və Operativ Məlumat Lövhəsi',
    desc: 'Müvəqqəti hərəkət məhdudiyyətləri, bağlanmalar, alternativ istiqamətlər — real vaxt.' },

  { id: 'portal',     num: 32, lines: ['Açıq Məlumat', 'Hesabat Portalı'],           color: 'citizen', x: X.citizen,     y: 284,
    label: 'Açıq Məlumat və İctimai Hesabat Portalı',
    desc: 'Agentliyin açıq statistikası, layihə statusları, ictimai hesabatlar — inteqrasiya ilə yenilənən portal.' },

  { id: 'chatbot',    num: 33, lines: ['Vətəndaş', 'AI Chatbot'],                    color: 'citizen', x: X.citizen,     y: 340,
    label: 'Vətəndaş AI Chatbot',
    desc: 'Agentlik xidmətləri, yollar, müraciət prosedurları üzrə süni intellekt əsaslı informasiya komponenti.' },
];
