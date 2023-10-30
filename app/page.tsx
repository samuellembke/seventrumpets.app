"use client"
import React, {useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader, Divider, CardBody,
    Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue
} from "@nextui-org/react";
import {ChevronDownIcon} from './ChevronDownIcon';
import {reduceNumber, sumOfString} from "@/helpers/numerologyHelper";
import {red} from "color-name";

export default function Home() {
    const englishAlphabetMap = new Map([
        ["a", 1],
        ["b", 2],
        ["c", 3],
        ["d", 4],
        ["e", 5],
        ["f", 6],
        ["g", 7],
        ["h", 8],
        ["i", 9],
        ["j", 10],
        ["k", 11],
        ["l", 12],
        ["m", 13],
        ["n", 14],
        ["o", 15],
        ["p", 16],
        ["q", 17],
        ["r", 18],
        ["s", 19],
        ["t", 20],
        ["u", 21],
        ["v", 22],
        ["w", 23],
        ["x", 24],
        ["y", 25],
        ["z", 26],
    ])

    const [currentAlphabet, setCurrentAlphabet] = useState<Map<string, number>>(englishAlphabetMap);
    const [alphabetResultRows, setAlphabetResultRows] = useState<Array<any>>([]);
    const [calculatorModeSelectedOption, setCalculatorModeSelectedOption] = React.useState(new Set(["word"]));
    const [wordResultRows, setWordResultRows] = useState<Array<any>>([]);
    const alphabetColumns = [
        {
            key: "letter",
            label: "LETTER",
        },
        {
            key: "number",
            label: "NUMBER",
        }
    ];

    const calculatorModeDescription = {
        word: "Reduce Words to numbers",
        name: "Reduce Names to numbers",
        lifepath: "Calculate Lifepath numbers",
    };
    const calculatorModeLabels = {
        word: "Reduce Words to numbers",
        name: "Reduce Names to numbers",
        lifepath: "Calculate Lifepath numbers",
    }

    const calculatorModeShortLabels = {
        word: "Word",
        name: "Name",
        lifepath: "Lifepath",
    }

    const calculatorModeSelectedOptionValue = Array.from(calculatorModeSelectedOption)[0];

    const wordResultColumns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "number",
            label: "NUMBER",
        }
    ];

    const onWordChange = (word: string) => {
        if (word == null || word.length === 0) {
            setWordResultRows([]);
            return;
        }
        const sum = sumOfString(word);
        const reduced = reduceNumber(sum);
        setWordResultRows([
            {
                key: "1",
                name: "SUM",
                number: sum
            },
            {
                key: "2",
                name: "REDUCED",
                number: reduced
            }
        ])
    }

    useEffect(() => {
        if (currentAlphabet != null) {
            // @ts-ignore
            setAlphabetResultRows([...currentAlphabet.entries()].map((value, index) => {
                return {
                    key: index+1,
                    letter: value[0],
                    number: value[1]
                }
            }))
        }
    }, [currentAlphabet])

    return (
        <div className="flex min-h-screen flex-col items-center justify-start px-20 py-10">
            <div className="header w-full flex flex-row justify-start items-center mb-16">
                <p className="fixed font-mono text-sm left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Seven Trumpets
                </p>
            </div>
            <div className="content w-full grid grid-cols-10 justify-start gap-20 px-6">
                <Card className="w-full col-span-2">
                    <CardHeader>
                        <ButtonGroup className="w-full" variant="flat">
                            <Button className="w-full text-start justify-start">{ // @ts-ignore
                                'Alphabet: ' + calculatorModeShortLabels[calculatorModeSelectedOptionValue]
                            }</Button>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Button isIconOnly>
                                        <ChevronDownIcon />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label="Merge options"
                                    selectedKeys={calculatorModeSelectedOption}
                                    selectionMode="single"
                                    onSelectionChange={(val) => {
                                        // @ts-ignore
                                        setCalculatorModeSelectedOption(val);
                                    }}
                                    className="max-w-[300px]"
                                >
                                    <DropdownItem key="word" description={calculatorModeDescription["word"]}>
                                        {calculatorModeLabels["word"]}
                                    </DropdownItem>
                                    <DropdownItem key="name" description={calculatorModeDescription["name"]}>
                                        {calculatorModeLabels["name"]}
                                    </DropdownItem>
                                    <DropdownItem key="lifepath" description={calculatorModeDescription["lifepath"]}>
                                        {calculatorModeLabels["lifepath"]}
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </ButtonGroup>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <Table>
                            <TableHeader columns={alphabetColumns}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={alphabetResultRows}>
                                {(item) => (
                                    // @ts-ignore
                                    <TableRow key={item.key}>
                                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>

                <Card className="w-full col-span-6 ">
                    <CardHeader>
                        <ButtonGroup className="w-full" variant="flat">
                            <Button className="w-full text-start justify-start">{ // @ts-ignore
                                'Calculate: ' + calculatorModeShortLabels[calculatorModeSelectedOptionValue]
                            }</Button>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Button isIconOnly>
                                        <ChevronDownIcon />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label="Merge options"
                                    selectedKeys={calculatorModeSelectedOption}
                                    selectionMode="single"
                                    onSelectionChange={(val) => {
                                        // @ts-ignore
                                        setCalculatorModeSelectedOption(val);
                                    }}
                                    className="max-w-[300px]"
                                >
                                    <DropdownItem key="word" description={calculatorModeDescription["word"]}>
                                        {calculatorModeLabels["word"]}
                                    </DropdownItem>
                                    <DropdownItem key="name" description={calculatorModeDescription["name"]}>
                                        {calculatorModeLabels["name"]}
                                    </DropdownItem>
                                    <DropdownItem key="lifepath" description={calculatorModeDescription["lifepath"]}>
                                        {calculatorModeLabels["lifepath"]}
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </ButtonGroup>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        { calculatorModeSelectedOptionValue === 'word' &&
                            <>
                                <div className="grid grid-cols-2 gap-x-4">
                                    <Input type="text" label="Word" onValueChange={onWordChange}></Input>
                                    <Table>
                                        <TableHeader columns={wordResultColumns}>
                                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                                        </TableHeader>
                                        <TableBody items={wordResultRows}>
                                            {(item) => (
                                                // @ts-ignore
                                                <TableRow key={item.key}>
                                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </>
                        }

                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
