---
title: "从零开始理解 Rust 所有权系统"
date: "2026-02-27"
tags: ["Rust", "系统编程", "教程"]
excerpt: "所有权是 Rust 最核心的概念，也是初学者最容易困惑的部分。本文通过多个实例，深入浅出地讲解所有权、借用和生命周期的概念。"
---

# 从零开始理解 Rust 所有权系统

所有权（Ownership）是 Rust 最独特的特性，也是它能够在没有垃圾回收的情况下保证内存安全的核心机制。

## 什么是所有权？

Rust 中的每一个值都有一个**所有者**（owner），当所有者离开作用域时，这个值就会被自动丢弃。

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 的所有权移动到 s2

    // println!("{}", s1); // 错误！s1 已经失效
    println!("{}", s2); // 正确
}
```

## 借用（Borrowing）

如果你不想转移所有权，可以使用**借用**：

```rust
fn main() {
    let s1 = String::from("hello");

    // 不可变借用
    let len = calculate_length(&s1);
    println!("{} 的长度是 {}", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

## 生命周期

生命周期确保引用始终有效。简单来说，它告诉编译器引用的有效范围。

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

## 小结

- 每个值有一个所有者
- 所有权可以转移（move）或借用（borrow）
- 生命周期确保引用有效
- 编译器在编译时就能防止悬挂引用

掌握这些概念，你就能真正理解 Rust 的独特魅力！
