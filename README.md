# tranimeizle-arama
`tranimeizle` sitesinde anime araması yapan basit bir REST API servisi.

## Kullanımı
`/<aranacak girdi>`

## Çıktı Örnekleri
`/seirei%20gensouki` isteği için dönen çıktı içeriği:

> Bilgi: `%20` ifadesi boşluk karakterini (" ") temsil eder.
```json
[
  {
    "title": "Seirei Gensouki İzle",
    "type": "Dizi",
    "href": "/anime/seirei-gensouki-izle",
    "image": "https://static.tranimeizle.top/animes/3473/medium.jpeg",
    "duration": "12 x 24 dk"
  },
  {
    "title": "Seirei Gensouki 2. Sezon İzle",
    "type": "Dizi",
    "href": "/anime/seirei-gensouki-2-sezon-izle",
    "image": "https://static.tranimeizle.top/animes/4656/medium.jpeg",
    "duration": "12 x 24 dk"
  }
]
```

`/kjadhkad` isteği için dönen çıktı içeriği:
```json
[]
```

## Çalışma Mantığı
Basitçe `/one piece` isteği için `"https://www.tranimeizle.top/arama/one piece` seklinde bir istek oluşturur ve bu istekten dönen html sayfasının içeriğinden arama sonuçlarını ayıklayıp düzenledikten sonra döndürür.

## Gizlilik Politikası
Bu kod hiçbir şekilde kayıt tutmaz. Ama `tranimeizle` sitesi kayıt tutuyor olabilir. O konuda elimden bir şey gelmez. Ama kayıt tutma olasılı bence düşük. Yani neden bir aramanın kaydını tutasın ki değil mi?

### Kayıt tutmadığına nasıl güveneceğim?
Kodu inceleyebilirsiniz. `Javascript`'ten anlamayan biri bile kayıt tutmadığını anlayabilir.

## Lisans
**GPL v3**
