package main

import "fmt"

type Stack[T any] struct {
	root []T
}

func NewStack[T any](vals ...T) *Stack[T] {
	return &Stack[T]{root: append([]T{}, vals...)}
}

func (s *Stack[T]) Push(val T) {
	s.root = append(s.root, val)
}

func (s *Stack[T]) Pop() (T, bool) {
	if len(s.root) == 0 {
		var zero T
		return zero, false
	}
	last := s.root[len(s.root)-1]
	s.root = s.root[:len(s.root)-1]
	return last, true
}

func (s *Stack[T]) Peek() (T, bool) {
	if len(s.root) == 0 {
		var zero T
		return zero, false
	}
	return s.root[len(s.root)-1], true
}

func (s *Stack[T]) Size() int {
	return len(s.root)
}

func (s *Stack[T]) IsEmpty() bool {
	return len(s.root) == 0
}

func main() {
	stack := NewStack[int](1, 2, 3)
	stack.Push(4)
	fmt.Println(stack.Pop())  
	fmt.Println(stack.Peek())
	fmt.Println(stack.Size())
	fmt.Println(stack.IsEmpty()) 
}
