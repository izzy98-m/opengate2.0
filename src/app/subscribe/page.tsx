'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Fan",
        price: "$9.99",
        features: [
            "Early access to tickets",
            "10% off merchandise",
            "Exclusive content",
        ],
        icon: <Star className="h-6 w-6 text-yellow-500" />
    },
    {
        name: "Super Fan",
        price: "$19.99",
        features: [
            "All Fan benefits",
            "Meet & greet lotteries",
            "20% off merchandise",
            "Ad-free experience",
        ],
        isPopular: true,
        icon: <Crown className="h-6 w-6 text-yellow-500" />
    },
];

export default function SubscribePage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-2 font-headline">Become a Member</h1>
                <p className="text-lg text-muted-foreground">Unlock exclusive perks and get closer to the action.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan) => (
                    <Card key={plan.name} className={cn("shadow-lg flex flex-col", plan.isPopular && "border-primary ring-2 ring-primary")}>
                        <CardHeader className="text-center">
                            <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-min">
                                {plan.icon}
                            </div>
                            <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                            <CardDescription className="text-4xl font-bold text-foreground">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-4">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className={cn("w-full font-bold", !plan.isPopular && "bg-accent hover:bg-accent/90")}>
                                {plan.isPopular ? "Choose Popular Plan" : "Select Plan"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
