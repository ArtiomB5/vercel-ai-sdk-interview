import jsdom from 'jsdom';

export async function POST(request: Request) {
    const { rq } = await request.json();

    // Выполняем запрос для получения HTML-страницы
    const result = await fetch(`https://search.brave.com/search?${rq}`);
    
    // Проверяем, был ли успешным запрос
    if (!result.ok) {
        throw new Error('Failed to fetch the page');
    }

    // Получаем HTML-разметку страницы
    const pageContent = await result.text();

    const { JSDOM } = jsdom;
    const { document } = (new JSDOM(pageContent)).window;

    // Извлекаем блоки div, содержащие классы 'results' и 'section'
    const results = document.getElementById('results')?.innerHTML;

    // Возвращаем разметку найденных div элементов в кодировке UTF-8
    return new Response(results, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        },
    });
}
