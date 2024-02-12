import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];
    const linkedList = generateLinkedList(elements);

    expect(linkedList).not.toBeNull();

    // Проверяем, что значения узлов связного списка соответствуют ожидаемым
    expect(linkedList?.value).toBe(1);
    expect(linkedList?.next?.value).toBe(2);
    expect(linkedList?.next?.next?.value).toBe(3);

    // Последний узел списка должен иметь null в поле next, чтобы указать на конец списка
    expect(linkedList?.next?.next?.next).toBeNull();
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = [1, 2, 3];
    const linkedList = generateLinkedList(elements);

    expect(linkedList).toMatchSnapshot();
  });
});
