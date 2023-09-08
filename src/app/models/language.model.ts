export class LanguageModel {
  private languages = [
    {
      "pk": 1,
      "fields": {
        "name": "german",
        "rating": 1,
        "rating_name": "Grundkenntnisse"
      }
    },
    {
      "pk": 2,
      "fields": {
        "name": "german",
        "rating": 2,
        "rating_name": "fließende Kenntnisse"
      }
    },
    {
      "pk": 3,
      "fields": {
        "name": "german",
        "rating": 3,
        "rating_name": "muttersprachliche Kenntnisse"
      }
    },
    {
      "pk": 4,
      "fields": {
        "name": "english",
        "rating": 1,
        "rating_name": "Grundkenntnisse"
      }
    },
    {
      "pk": 5,
      "fields": {
        "name": "english",
        "rating": 2,
        "rating_name": "fließende Kenntnisse"
      }
    },
    {
      "pk": 6,
      "fields": {
        "name": "english",
        "rating": 3,
        "rating_name": "muttersprachliche Kenntnisse"
      }
    },
    {
      "pk": 7,
      "fields": {
        "name": "polish",
        "rating": 1,
        "rating_name": "Grundkenntnisse"
      }
    },
    {
      "pk": 8,
      "fields": {
        "name": "polish",
        "rating": 2,
        "rating_name": "fließende Kenntnisse"
      }
    },
    {
      "pk": 9,
      "fields": {
        "name": "polish",
        "rating": 3,
        "rating_name": "muttersprachliche Kenntnisse"
      }
    },
    {
      "pk": 10,
      "fields": {
        "name": "german",
        "rating": 0,
        "rating_name": "keine Kenntnis"
      }
    },
    {
      "pk": 11,
      "fields": {
        "name": "english",
        "rating": 0,
        "rating_name": "No knowledge"
      }
    },
    {
      "pk": 12,
      "fields": {
        "name": "polish",
        "rating": 0,
        "rating_name": "keine Kenntnis"
      }
    }
  ];

  public getByNameAndRatings(name: string, ratings: number) {
    for (let language of this.languages) {
      if (language.fields.name === name && language.fields.rating === ratings) {
        return language.pk;
      }
    }
  }

  public getLanguageSkill(id: number) {
    for (let language of this.languages) {
      if (language.pk === id) {
        return language.fields.rating_name;
      }
    }
    if (id === 0) {
      return 'Keine Kenntnis';
    }
    return 'NOT AVAILABLE';
  }

}
