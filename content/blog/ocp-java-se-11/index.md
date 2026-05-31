---
title: "My experience with the OCP Java SE 11 certification"
subtitle: "A practical write-up on the tricky parts of the OCP Java SE 11 certification."
date: 2026-01-15
tags: ["Java", "Certification", "OCP", "Java SE 11"]
---

January 2026: I finally earned the **OCP Java SE 11 Developer** certification.

It was an intense journey with more than **four months of preparation**. I failed twice before passing on the third attempt. Java hides a surprising number of subtle and sometimes quirky rules, and the exam rewards precision more than speed.

Here is a tour of the trickiest concepts I ran into while preparing.

{{< section-label >}}Strings{{< /section-label >}}

## Strings & String Pool

One of the exam's favorite topics is String memory management. Understanding the difference between the **String Pool** and the **Heap** is essential.

{{< definition term="String Constant Pool" icon="🧵" >}}
A special area in the heap where Java stores string literals so identical instances can be reused and memory can be saved.
{{< /definition >}}

{{< diagram src="string-pool" caption="String Pool vs Heap in Java" >}}

{{< codeblock label="String comparison" lang="java" >}}
String a = "hello";
String b = "hello";
String c = new String("hello");

System.out.println(a == b);      // true  — same reference in the pool
System.out.println(a == c);      // false — c lives on the heap, outside the pool
System.out.println(a.equals(c)); // true  — the values are equal
{{< /codeblock >}}

{{< callout type="warning" title="Watch out for concatenation" >}}
Concatenation with `+` is optimized at compile time only when it involves constants, such as literals or `final` variables. Otherwise it happens at runtime and creates a new object on the heap.
{{< /callout >}}

---

{{< section-label >}}Operators and Types{{< /section-label >}}

## Numeric Promotion and Cache

Primitive types also have their secrets. Did you know that `byte`, `short`, and `char` are always promoted to `int` during arithmetic operations?

{{< codeblock label="Numeric promotion" lang="java" >}}
byte b = 10;
b = b + 1;    // Compilation error: the result is an int
b += 1;       // OK: compound operators perform an implicit cast
b = (byte)(b + 1); // OK: explicit cast
{{< /codeblock >}}

{{< callout type="info" title="Integer Cache" >}}
Java caches `Integer` objects for values from **-128 to 127**. Outside that range, `==` can return `false` even for equal values. Prefer `.equals()` for value comparison.
{{< /callout >}}

---

{{< section-label >}}Object-Oriented Programming{{< /section-label >}}

## Hiding vs Overriding

This is probably one of the most deceptive traps: the difference between method **overriding** and **hiding**.

- Instance methods are **overridden** through polymorphism.
- Static methods and variables are **hidden**.

{{< codeblock label="Static Method Hiding" lang="java" >}}
class Parent {
    static void greet() { System.out.println("Hello from Parent"); }
}
class Child extends Parent {
    static void greet() { System.out.println("Hello from Child"); }
}

Parent p = new Child();
p.greet(); // Prints "Hello from Parent" because resolution uses the reference type.
{{< /codeblock >}}

---

{{< section-label >}}Exceptions{{< /section-label >}}

## The Exception Hierarchy

It is important to distinguish **checked** exceptions from **unchecked** exceptions.

{{< diagram src="exception-hierarchy" caption="Simplified Java exception hierarchy" >}}

{{< callout type="danger" title="Catch block order" >}}
`catch` blocks must go from the most specific exception type to the most general one. Reversing the order causes a compilation error because the more specific block becomes unreachable.
{{< /callout >}}

---

{{< section-label >}}Lambdas and Streams{{< /section-label >}}

## Effectively Final

Lambdas can capture local variables, but only if those variables are **effectively final**.

{{< codeblock label="Variable capture" lang="java" >}}
int x = 10;
Runnable r = () -> System.out.println(x); // OK
// x = 20; // If this is uncommented, the lambda above no longer compiles.
{{< /codeblock >}}

---

{{< conclusion title="Conclusion" >}}
The OCP Java 11 certification does not only test whether you can write code. It tests whether you understand the language rules in detail. Mastering these traps is a big part of passing.

**One final tip:** read every question twice. The trap is often hidden in a syntax detail or a scoping rule that is easy to miss under exam pressure. Good luck!
{{< /conclusion >}}
