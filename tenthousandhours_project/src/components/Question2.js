import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, fa2, fa3, fa4, fa5 } from '@fortawesome/free-solid-svg-icons';
import { Button, Text } from "@chakra-ui/react";
import './Question2.css';

const Question2 = () => {
  const allIcons = [fa1, fa2, fa3, fa4, fa5];
  const [icons, setIcons] = useState(allIcons);
  const [removedIcons, setRemovedIcons] = useState([]);
  const [message, setMessage] = useState('');

  const handlePop = () => {
    if (icons.length > 0) {
      if (!removedIcons.includes(icons[0])) {
        setRemovedIcons([icons[0], ...removedIcons]);
      }
      setIcons(icons.slice(1));
      setMessage(`
            Code to pop an element from stack:

      JavaScript:

      class Stack {
        constructor() {
          this.items = [];
        }
      
        push(element) {
          this.items.push(element);
        }
      
        pop() {
          if (this.isEmpty()) {
            return "Underflow";
          }
          return this.items.pop();
        }
      
        isEmpty() {
          return this.items.length === 0;
        }
      
        peek() {
          return !this.isEmpty() ? this.items[this.items.length - 1] : null;
        }
      
        printStack() {
          let stackStr = "";
          for (let i = 0; i < this.items.length; i++) {
            stackStr += this.items[i] + " ";
          }
          return stackStr.trim();
        }
      }
      
      TypeScript:

      class Stack<T> {
        private items: T[];
      
        constructor() {
          this.items = [];
        }
      
        push(element: T) {
          this.items.push(element);
        }
      
        pop(): T | string {
          if (this.isEmpty()) {
            return "Underflow";
          }
          return this.items.pop()!;
        }
      
        isEmpty(): boolean {
          return this.items.length === 0;
        }
      
        peek(): T | null {
          return !this.isEmpty() ? this.items[this.items.length - 1] : null;
        }
      
        printStack(): string {
          return this.items.join(" ");
        }
      }

      Python:

      class Stack:
    def __init__(self):
        self.items = []

    def push(self, element):
        self.items.append(element)

    def pop(self):
        if self.is_empty():
            return "Underflow"
        return self.items.pop()

    def is_empty(self):
        return len(self.items) == 0

    def peek(self):
        return self.items[-1] if not self.is_empty() else None

    def print_stack(self):
        return ' '.join(map(str, self.items))

    Java:

    import java.util.ArrayList;
    import java.util.List;
    
    public class Stack<T> {
        private List<T> items;
    
        public Stack() {
            this.items = new ArrayList<>();
        }
    
        public void push(T element) {
            this.items.add(element);
        }
    
        public T pop() {
            if (isEmpty()) {
                return null; // Or handle underflow as needed
            }
            return this.items.remove(this.items.size() - 1);
        }
    
        public boolean isEmpty() {
            return this.items.isEmpty();
        }
    
        public T peek() {
            return isEmpty() ? null : this.items.get(this.items.size() - 1);
        }
    
        public String printStack() {
            StringBuilder sb = new StringBuilder();
            for (T item : this.items) {
                sb.append(item).append(" ");
            }
            return sb.toString().trim();
        }

       C#:

       using System;
       using System.Collections.Generic;
       
       class Stack<T>
       {
           private List<T> items;
       
           public Stack()
           {
               items = new List<T>();
           }
       
           public void Push(T element)
           {
               items.Add(element);
           }
       
           public T Pop()
           {
               if (IsEmpty())
               {
                   return default(T); // Or handle underflow as needed
               }
               T popped = items[items.Count - 1];
               items.RemoveAt(items.Count - 1);
               return popped;
           }
       
           public bool IsEmpty()
           {
               return items.Count == 0;
           }
       
           public T Peek()
           {
               return IsEmpty() ? default(T) : items[items.Count - 1];
           }
       
           public string PrintStack()
           {
               return string.Join(" ", items);
           }

           PHP:

           class Stack {
            private $items;
        
            public function __construct() {
                $this->items = [];
            }
        
            public function push($element) {
                array_push($this->items, $element);
            }
        
            public function pop() {
                if ($this->isEmpty()) {
                    return "Underflow";
                }
                return array_pop($this->items);
            }
        
            public function isEmpty() {
                return empty($this->items);
            }
        
            public function peek() {
                return $this->isEmpty() ? null : end($this->items);
            }
        
            public function printStack() {
                return implode(' ', $this->items);
            }
        }`
    );
    } else {
      setMessage('Nothing to pop');
    }
  };

  const handleInsert = (icon) => {
    if (!icons.includes(icon)) {
      setIcons([icon, ...icons]);
      setRemovedIcons(removedIcons.filter(item => item !== icon)); // remove the inserted icon from the removedIcons array
      setMessage(`
            Code to insert an element into stack:

            Javascript:

            class Stack {
                constructor() {
                  this.items = [];
                }
              
                push(element) {
                  this.items.push(element);
                }
              
                pop() {
                  if (this.isEmpty()) {
                    return "Underflow";
                  }
                  return this.items.pop();
                }
              
                isEmpty() {
                  return this.items.length === 0;
                }
              
                peek() {
                  return !this.isEmpty() ? this.items[this.items.length - 1] : null;
                }
              
                printStack() {
                  let stackStr = "";
                  for (let i = 0; i < this.items.length; i++) {
                    stackStr += this.items[i] + " ";
                  }
                  return stackStr.trim();
                }
              }

                TypeScript:

                class Stack<T> {
                    private items: T[];
                  
                    constructor() {
                      this.items = [];
                    }
                  
                    push(element: T) {
                      this.items.push(element);
                    }
                  
                    pop(): T | string {
                      if (this.isEmpty()) {
                        return "Underflow";
                      }
                      return this.items.pop()!;
                    }
                  
                    isEmpty(): boolean {
                      return this.items.length === 0;
                    }
                  
                    peek(): T | null {
                      return !this.isEmpty() ? this.items[this.items.length - 1] : null;
                    }
                  
                    printStack(): string {
                      return this.items.join(" ");
                    }
                  }
                  
                    Python:

                    class Stack:
                    def __init__(self):
                    self.items = []

    def push(self, element):
        self.items.append(element)

    def pop(self):
        if self.is_empty():
            return "Underflow"
        return self.items.pop()

    def is_empty(self):
        return len(self.items) == 0

    def peek(self):
        return self.items[-1] if not self.is_empty() else None

    def print_stack(self):
        return ' '.join(map(str, self.items))

    Java:

    import java.util.ArrayList;
import java.util.List;

public class Stack<T> {
    private List<T> items;

    public Stack() {
        this.items = new ArrayList<>();
    }

    public void push(T element) {
        this.items.add(element);
    }

    public T pop() {
        if (isEmpty()) {
            return null; // Or handle underflow as needed
        }
        T popped = items.remove(items.size() - 1);
        return popped;
    }

    public boolean isEmpty() {
        return this.items.isEmpty();
    }

    public T peek() {
        return isEmpty() ? null : this.items.get(this.items.size() - 1);
    }

    public String printStack() {
        StringBuilder sb = new StringBuilder();
        for (T item : this.items) {
            sb.append(item).append(" ");
        }
        return sb.toString().trim();
    }

    C#:

    using System;
using System.Collections.Generic;

class Stack<T>
{
    private List<T> items;

    public Stack()
    {
        items = new List<T>();
    }

    public void Push(T element)
    {
        items.Add(element);
    }

    public T Pop()
    {
        if (IsEmpty())
        {
            return default(T); // Or handle underflow as needed
        }
        T popped = items[items.Count - 1];
        items.RemoveAt(items.Count - 1);
        return popped;
    }

    public bool IsEmpty()
    {
        return items.Count == 0;
    }

    public T Peek()
    {
        return IsEmpty() ? default(T) : items[items.Count - 1];
    }

    public string PrintStack()
    {
        return string.Join(" ", items);
    }

    PHP:

    class Stack {
        private $items;
    
        public function __construct() {
            $this->items = [];
        }
    
        public function push($element) {
            array_push($this->items, $element);
        }
    
        public function pop() {
            if ($this->isEmpty()) {
                return "Underflow";
            }
            return array_pop($this->items);
        }
    
        public function isEmpty() {
            return empty($this->items);
        }
    
        public function peek() {
            return $this->isEmpty() ? null : end($this->items);
        }
    
        public function printStack() {
            return implode(' ', $this->items);
        }
    }
      `);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
    <Text mt={4} mb={8} ml={10} mr={10} color= 'orange' textAlign='center' fontSize='lg'>Reverse the stack. Play around with the stack and check out the auto-generated code</Text>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', height: '100%', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {removedIcons.map((icon, index) => (
            <FontAwesomeIcon key={index} icon={icon} size="2x" style={{ color: 'orange', margin: '10px' }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {icons.map((icon, index) => (
            <FontAwesomeIcon key={index} icon={icon} size="2x" style={{ color: 'orange', margin: '10px' }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <Button variant="outline" colorScheme="blue" mb={4} size="lg" onClick={handlePop}>Pop</Button>
          {allIcons.map((icon, index) => (
            <Button
              key={index}
              variant="outline"
              colorScheme="blue"
              mb={4}
              size="lg"
              onClick={() => handleInsert(icon)}
            >
              Insert {index + 1}
            </Button>
          ))}
        </div>
      </div>
      <div className='message-class' style={{ position: 'relative', top: '-180px'}}>
        <pre><code>{message}</code></pre>
      </div>
    </div>
  );
}
export default Question2;