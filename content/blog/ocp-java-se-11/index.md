---
title: "Mon expérience avec la certification OCP Java SE 11"
subtitle: "Retour d'expérience et guide technique sur les pièges de la certification OCP Java SE 11."
date: 2026-01-15
tags: ["Java", "Certification", "OCP", "Java SE 11"]
---

Janvier 2026 : j'ai enfin obtenu la certification **OCP Java SE 11 Developer**. 

Ce fut un parcours intense de plus de **4 mois de préparation**. Après avoir échoué deux fois, la troisième tentative a été la bonne. Java cache énormément de subtilités et de comportements "quirky" (parfois inattendus) qui demandent une rigueur absolue. 

Voici un tour d'horizon des concepts les plus piégeux que j'ai rencontrés lors de mes révisions.

{{< section-label >}}Les Chaînes de Caractères{{< /section-label >}}

## Strings & String Pool

L'un des sujets préférés de l'examen est la gestion de la mémoire des Strings. Comprendre la différence entre le **String Pool** et le **Heap** est crucial.

{{< definition term="String Constant Pool" icon="🧵" >}}
Une zone spéciale dans la Heap où Java stocke les littéraux de chaînes de caractères pour économiser de la mémoire en réutilisant les instances identiques.
{{< /definition >}}

{{< diagram src="string-pool" caption="String Pool vs Heap en Java" >}}

{{< codeblock label="Comparaison de Strings" lang="java" >}}
String a = "hello";
String b = "hello";
String c = new String("hello");

System.out.println(a == b);      // true  — même référence dans le pool
System.out.println(a == c);      // false — c est sur la heap (hors pool)
System.out.println(a.equals(c)); // true  — les valeurs sont identiques
{{< /codeblock >}}

{{< callout type="warning" title="Attention à la concaténation" >}}
La concaténation avec `+` n'est optimisée au moment de la compilation que si elle implique des constantes (littéraux ou variables `final`). Sinon, elle se fait au runtime et crée un nouvel objet sur la heap.
{{< /callout >}}

---

{{< section-label >}}Opérateurs et Types{{< /section-label >}}

## Promotion Numérique et Cache

Les types primitifs ont aussi leurs secrets. Saviez-vous que `byte`, `short` et `char` sont systématiquement promus en `int` lors d'une opération arithmétique ?

{{< codeblock label="Promotion numérique" lang="java" >}}
byte b = 10;
b = b + 1;    // ERREUR de compilation : le résultat est un int
b += 1;       // OK : les opérateurs composés effectuent un cast automatique
b = (byte)(b + 1); // OK : cast explicite
{{< /codeblock >}}

{{< callout type="info" title="Integer Cache" >}}
Java met en cache les objets `Integer` pour les valeurs allant de **-128 à 127**. En dehors de cette plage, `==` retournera `false` même pour des valeurs identiques. Utilisez toujours `.equals()`.
{{< /callout >}}

---

{{< section-label >}}Programmation Orientée Objet{{< /section-label >}}

## Hiding vs Overriding

C'est probablement le piège le plus vicieux : la différence entre la redéfinition (*overriding*) et le masquage (*hiding*).

- Les méthodes d'instance sont **redéfinies** (polymorphisme).
- Les méthodes statiques et les variables sont **masquées**.

{{< codeblock label="Static Method Hiding" lang="java" >}}
class Parent {
    static void greet() { System.out.println("Hello from Parent"); }
}
class Child extends Parent {
    static void greet() { System.out.println("Hello from Child"); }
}

Parent p = new Child();
p.greet(); // Affiche "Hello from Parent" ! La résolution est faite au type de la référence.
{{< /codeblock >}}

---

{{< section-label >}}Exceptions{{< /section-label >}}

## La Hiérarchie des Exceptions

Il est essentiel de distinguer les exceptions **Checked** des **Unchecked**.

{{< diagram src="exception-hierarchy" caption="Hiérarchie simplifiée des exceptions en Java" >}}

{{< callout type="danger" title="Ordre des catch" >}}
Les blocs `catch` doivent aller du plus spécifique au plus général. Inverser l'ordre provoquera une erreur de compilation car le code devient inatteignable.
{{< /callout >}}

---

{{< section-label >}}Lambdas et Streams{{< /section-label >}}

## Effectively Final

Les lambdas peuvent capturer des variables locales, mais à une condition : elles doivent être **effectively final**.

{{< codeblock label="Variable capture" lang="java" >}}
int x = 10;
Runnable r = () -> System.out.println(x); // OK
// x = 20; // Si on décommente ceci, la lambda au-dessus ne compilera plus !
{{< /codeblock >}}

---

{{< conclusion title="Conclusion" >}}
La certification OCP Java 11 ne teste pas seulement votre capacité à écrire du code, mais votre compréhension intime des règles du langage. Maîtriser ces pièges est la clé du succès.

**Un dernier conseil :** Lisez chaque question deux fois. Le piège est souvent caché dans un détail de syntaxe ou une règle de portée que l'on oublie facilement sous le stress de l'examen. Bonne chance !
{{< /conclusion >}}
