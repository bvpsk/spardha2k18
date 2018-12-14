#include <stdio.h>
int manideep(int,int);
void temp();
int main(){
    int a,b;
    printf("Enter two numbers : ");
    scanf("%d %d",&a,&b);
    printf("Sum is %d.",manideep(a,b));
    temp();
    return(0);
}
int manideep(int a,int b){
    return a+b;
}
void temp(){
    printf("This is a test function!!!");
}