import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/vitepress-c-sharp/',
  title: "C# Zero to Hero",
  description: "เอกสารประกอบการเรียนการสอนภาษา C# แบบ Zero to Hero เน้น Console Application",
  themeConfig: {
    nav: [
      { text: 'หน้าแรก', link: '/' },
      {
        text: 'บทเรียน',
        items: [
          { text: 'Ch.1 — Introduction to C#',          link: '/chapter1/' },
          { text: 'Ch.2 — Variables & Data Types',       link: '/chapter2/' },
          { text: 'Ch.3 — Operators & Control Flow',     link: '/chapter3/' },
          { text: 'Ch.4 — Loops & Iteration',            link: '/chapter4/' },
          { text: 'Ch.5 — Methods & Functions',          link: '/chapter5/' },
          { text: 'Ch.6 — Arrays & Collections',         link: '/chapter6/' },
          { text: 'Ch.7 — Strings in Depth',             link: '/chapter7/' },
          { text: 'Ch.8 — Enums & Structs',              link: '/chapter8/' },
          { text: 'Ch.9 — OOP Basics',                   link: '/chapter9/' },
          { text: 'Ch.10 — OOP Advanced',                link: '/chapter10/' },
          { text: 'Ch.11 — Lambda & Delegates',          link: '/chapter11/' },
          { text: 'Ch.12 — LINQ',                        link: '/chapter12/' },
          { text: 'Ch.13 — Exception & File I/O',        link: '/chapter13/' },
        ]
      }
    ],

    sidebar: [
      {
        text: 'บทที่ 1 — Introduction to C#',
        collapsed: false,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter1/' },
          { text: '01 — C# คืออะไร และ .NET',            link: '/chapter1/01-what-is-csharp-and-dotnet' },
          { text: '02 — ติดตั้ง Environment',             link: '/chapter1/02-setup-environment' },
          { text: '03 — Hello World',                     link: '/chapter1/03-hello-world' },
          { text: '04 — โครงสร้างโปรแกรม',               link: '/chapter1/04-program-structure' },
          { text: '05 — Comments & Code Style',           link: '/chapter1/05-comments-and-code-style' },
          { text: '🧪 Lab: My First Console App',         link: '/chapter1/99-lab-first-program' },
        ]
      },
      {
        text: 'บทที่ 2 — Variables & Data Types',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter2/' },
          { text: '01 — Variables & Declaration',         link: '/chapter2/01-variables-and-declaration' },
          { text: '02 — Numeric Types',                   link: '/chapter2/02-numeric-types' },
          { text: '03 — bool, char & Other Types',        link: '/chapter2/03-bool-char-and-other-types' },
          { text: '04 — var, const, readonly',            link: '/chapter2/04-var-const-readonly' },
          { text: '05 — Type Conversion & Casting',       link: '/chapter2/05-type-conversion-and-casting' },
          { text: '🧪 Lab: Data Collector',               link: '/chapter2/99-lab-data-collector' },
        ]
      },
      {
        text: 'บทที่ 3 — Operators & Control Flow',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter3/' },
          { text: '01 — Arithmetic Operators',            link: '/chapter3/01-arithmetic-operators' },
          { text: '02 — Comparison & Logical Operators',  link: '/chapter3/02-comparison-and-logical-operators' },
          { text: '03 — Ternary & Null Operators',        link: '/chapter3/03-ternary-and-null-operators' },
          { text: '04 — if / else',                       link: '/chapter3/04-if-else' },
          { text: '05 — switch',                          link: '/chapter3/05-switch' },
          { text: '🧪 Lab: Grade Checker',                link: '/chapter3/99-lab-grade-checker' },
        ]
      },
      {
        text: 'บทที่ 4 — Loops & Iteration',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter4/' },
          { text: '01 — for loop',                        link: '/chapter4/01-for-loop' },
          { text: '02 — while loop',                      link: '/chapter4/02-while-loop' },
          { text: '03 — do-while loop',                   link: '/chapter4/03-do-while-loop' },
          { text: '04 — break & continue',                link: '/chapter4/04-break-continue' },
          { text: '05 — Nested Loops',                    link: '/chapter4/05-nested-loops' },
          { text: '🧪 Lab: Multiplication Table',         link: '/chapter4/99-lab-multiplication-table' },
        ]
      },
      {
        text: 'บทที่ 5 — Methods & Functions',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter5/' },
          { text: '01 — Methods Basics',                  link: '/chapter5/01-methods-basics' },
          { text: '02 — Parameters & Return Values',      link: '/chapter5/02-parameters-and-return-values' },
          { text: '03 — Optional & Named Parameters',     link: '/chapter5/03-optional-and-named-parameters' },
          { text: '04 — out & ref Parameters',            link: '/chapter5/04-out-and-ref-parameters' },
          { text: '05 — Method Overloading',              link: '/chapter5/05-method-overloading' },
          { text: '06 — Recursion',                       link: '/chapter5/06-recursion' },
          { text: '🧪 Lab: Console Calculator',           link: '/chapter5/99-lab-console-calculator' },
        ]
      },
      {
        text: 'บทที่ 6 — Arrays & Collections',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter6/' },
          { text: '01 — Arrays (1D)',                     link: '/chapter6/01-arrays-1d' },
          { text: '02 — Arrays (2D)',                     link: '/chapter6/02-arrays-2d' },
          { text: '03 — List&lt;T&gt;',                   link: '/chapter6/03-list' },
          { text: '04 — Dictionary&lt;K,V&gt;',           link: '/chapter6/04-dictionary' },
          { text: '05 — Queue & Stack',                   link: '/chapter6/05-queue-and-stack' },
          { text: '🧪 Lab: Student Grade Manager',        link: '/chapter6/99-lab-student-grade-manager' },
        ]
      },
      {
        text: 'บทที่ 7 — Strings in Depth',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter7/' },
          { text: '01 — String Basics & Immutability',    link: '/chapter7/01-string-basics-and-immutability' },
          { text: '02 — String Methods',                  link: '/chapter7/02-string-methods' },
          { text: '03 — Interpolation & Formatting',      link: '/chapter7/03-string-interpolation-and-formatting' },
          { text: '04 — StringBuilder',                   link: '/chapter7/04-stringbuilder' },
          { text: '🧪 Lab: Text Processor',               link: '/chapter7/99-lab-text-processor' },
        ]
      },
      {
        text: 'บทที่ 8 — Enums & Structs',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter8/' },
          { text: '01 — Enums Basics',                    link: '/chapter8/01-enums-basics' },
          { text: '02 — Enum Methods & Flags',            link: '/chapter8/02-enum-methods-and-flags' },
          { text: '03 — Structs Basics',                  link: '/chapter8/03-structs-basics' },
          { text: '04 — Struct vs Class',                 link: '/chapter8/04-struct-vs-class' },
          { text: '🧪 Lab: Task Status Manager',          link: '/chapter8/99-lab-task-status-manager' },
        ]
      },
      {
        text: 'บทที่ 9 — OOP Basics',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter9/' },
          { text: '01 — OOP Concepts Overview',           link: '/chapter9/01-oop-concepts-overview' },
          { text: '02 — Classes & Objects',               link: '/chapter9/02-classes-and-objects' },
          { text: '03 — Access Modifiers',                link: '/chapter9/03-access-modifiers' },
          { text: '04 — Fields & Properties',             link: '/chapter9/04-fields-and-properties' },
          { text: '05 — Constructors',                    link: '/chapter9/05-constructors' },
          { text: '06 — static Keyword',                  link: '/chapter9/06-static-keyword' },
          { text: '🧪 Lab: Bank Account',                 link: '/chapter9/99-lab-bank-account' },
        ]
      },
      {
        text: 'บทที่ 10 — OOP Advanced',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter10/' },
          { text: '01 — Inheritance Basics',              link: '/chapter10/01-inheritance-basics' },
          { text: '02 — Protected Modifier',              link: '/chapter10/02-protected-modifier' },
          { text: '03 — The base Keyword',                link: '/chapter10/03-base-keyword' },
          { text: '04 — Polymorphism & Virtual',          link: '/chapter10/04-polymorphism-and-virtual-methods' },
          { text: '05 — Abstract Classes',                link: '/chapter10/05-abstract-classes' },
          { text: '06 — Interfaces',                      link: '/chapter10/06-interfaces' },
          { text: '🧪 Lab: Payroll System',               link: '/chapter10/99-lab-payroll-system' },
        ]
      },
      {
        text: 'บทที่ 11 — Lambda & Delegates',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter11/' },
          { text: '01 — Delegates Basics',                link: '/chapter11/01-delegates-basics' },
          { text: '02 — Action, Func & Predicate',        link: '/chapter11/02-action-func-predicate' },
          { text: '03 — Lambda Expressions',              link: '/chapter11/03-lambda-expressions' },
          { text: '04 — Closures & Captured Variables',   link: '/chapter11/04-closures-and-captured-variables' },
          { text: '🧪 Lab: Filter System',                link: '/chapter11/99-lab-filter-system' },
        ]
      },
      {
        text: 'บทที่ 12 — LINQ',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter12/' },
          { text: '01 — What is LINQ?',                   link: '/chapter12/01-what-is-linq' },
          { text: '02 — Filtering with Where',            link: '/chapter12/02-filtering-with-where' },
          { text: '03 — Projection with Select',          link: '/chapter12/03-projection-with-select' },
          { text: '04 — Sorting (OrderBy, ThenBy)',       link: '/chapter12/04-sorting' },
          { text: '05 — Aggregation (Sum, Max, Min)',     link: '/chapter12/05-aggregation' },
          { text: '06 — Any & All Logic',                 link: '/chapter12/06-any-and-all' },
          { text: '07 — First, Last, Single',             link: '/chapter12/07-first-last-single' },
          { text: '08 — Deferred Execution',              link: '/chapter12/08-deferred-execution' },
          { text: '🧪 Lab: LINQ RPG Inventory',           link: '/chapter12/99-lab-linq-rpg-inventory' },
        ]
      },
      {
        text: 'บทที่ 13 — Exception Handling & File I/O',
        collapsed: true,
        items: [
          { text: '📋 ภาพรวมบท',                         link: '/chapter13/' },
          { text: '01 — try / catch / finally',           link: '/chapter13/01-try-catch-finally' },
          { text: '02 — Exception Types',                 link: '/chapter13/02-exception-types' },
          { text: '03 — Custom Exceptions',               link: '/chapter13/03-custom-exceptions' },
          { text: '04 — using & IDisposable',             link: '/chapter13/04-using-statement-and-idisposable' },
          { text: '05 — File I/O Basics',                 link: '/chapter13/05-file-io-basics' },
          { text: '06 — StreamReader & Writer',           link: '/chapter13/06-streamreader-and-writer' },
          { text: '🧪 Lab: Notes App',                    link: '/chapter13/99-lab-notes-app' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],

    footer: {
      message: 'C# Zero to Hero — เอกสารประกอบการเรียนการสอน',
    },

    search: {
      provider: 'local'
    }
  }
})
