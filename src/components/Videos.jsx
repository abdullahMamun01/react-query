
import { Card, Container, Flex, Text } from '@radix-ui/themes';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import FormDemo from './FormDemo';
export default function Videos() {
    const fetchPosts = async () => {
        const response = await axios.get(`http://localhost:4000/videos`);
        return response.data;
    }

    const { data, status } = useQuery({
        queryKey: ['videos'],
        queryFn: fetchPosts,
        config : {caches : 1000}
    });

    console.log("i am render from videos....")

    if (status === 'pending') {
        console.log(status)
        return <span>Loading...</span>
    }
    return (
        <div className='min-h-screen '>


            <Container size={2}>
                <Flex gap={3}>
                    {/* <DecorativeBox></DecorativeBox> */}
                    {data && data.map(vd => (
                        <Card key={vd.id} asChild style={{ maxWidth: 350 }}>
                            <a href="#">
                                <Text as="div" size="2" weight="bold">
                                    {vd.title}
                                </Text>
                                <Text as="div" color="gray" size="2">
                                    {vd.content}
                                </Text>
                            </a>
                        </Card>
                    ))}
                </Flex>
            </Container>
            <div className="flex justify-center">
                <FormDemo fetchPosts={fetchPosts} />

            </div>
        </div>

    )
}
// { "id": 1, "title": "Introduction to Vite", "content": "Vite is a fast build tool for modern web development." },