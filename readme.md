# Laboration 3, NoSQL-databaser REST API
Detta är en laboration i _Webbutveckingsprogrammet_ på Mittuniveristetet.

Repot innehåller kod för ett enkelt REST API som är byggt med express.
APIet är byggt för att hantera tidigare arbetserfarenheter såsom arbetsplats, typ av jobb, beskrivning och anställningstid.
CRUD (Create, Read, Update and Delete) är implementerat.

## Redovsning
[Webbtjänst](https://dt207g-laboration3.onrender.com/jobs)

## Databas
APIet använder MongoDb som databas med Mongoose.


| Collection  | Field        |
| ----------- | ----------- |
| job         | **_id**(ObjectID), **companyname**(TEXT), **jobtitle**(TEXT), **location**(TEXT), **description**(TEXT), **startdate**(TEXT), **enddate**, (TEXT), createdAt(TIMESTAMP), updatedAt(TIMESTAMP)      |

## Användning
Tabellen nedan beskriver olika sätt att nå APIet.

| Metod      | Endpoint | Beskrivning  |
| ----------- | ----------- | ----------- |
| GET      | /jobs       |  Hämtar alla inlagda jobb  |
| GET   | /jobs/:ID        |  Hämtar jobb med specifikt angivet ID  |
| POST      | /jobs       |  Lagarar nytt jobb. Kräver att jobb-objekt skickas med, se struktur längre ned.  |
| PUT   | /jobs/:ID        | Ändrar jobb med specifikt angivet ID. Kärver att jobb-objekt skickas med, se struktur längre ned. |
| DELETE      | /jobs/:ID       | Raderar ett jobb med specifikt angivet ID  |

Ett jobb-objekt returneras som JSON med nedan struktur:
```json
  {
    "_id": "69eb3736caf4735b6664ca0d",
    "companyname": "Toyota",
    "jobtitle": "Tekniker",
    "location": "Göteborg",
    "description": "Bilreparationer",
    "startdate": "2017-01-05",
    "enddate": "2019-06-28",
    "createdAt": "2026-04-24T09:26:14.982Z",
    "updatedAt": "2026-04-27T09:17:33.265Z",
    "__v": 0
  },
```

Ett jobb-objekt skickas som JSON med nedan struktur:
```json
{
   "companyname": "Ett företagsnamn",
   "jobtitle": "Jobbtitel",
   "description": "En beskrivning av vad jobbet innehållit",
   "startdate": "2026-01-01",
   "enddate": "2026-12-31",
}
```

## Kontakt
 Vill du komma i kontakt med mig?


**Hanna Lindkvist** \
✉️ [hali2507@student.miun.se](mailto:hali2507@student.miun.se)
